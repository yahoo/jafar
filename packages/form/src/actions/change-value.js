/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  debounce,
  isEqual,
  isFunction,
} from 'lodash';
import {
  throwError, errors, createError,
} from '../errors';
import log from '../log';
import {
  evaluateValue,
  isFieldDirty,
  evaluateTerm,
  validateField,
  getDependentFieldsIds,
  getDependenciesChangeResult,
  getFieldParsedValue,
  getFieldFormattedValue,
} from '../utils';
import {
  addPendingAction,
} from '../pending-actions';
import {
  addCachedDebounceResolve,
  removeCachedDebounceResolve,
  handleDebounceFlush,
  setFormEvaluationResult,
} from './common';
import {
  setFieldValue,
  setFieldComponentValue,
  setFieldEvaluation,
} from './creator';
import {
  Actions,
} from './types';
import {
  setStateAndPrevStateToStore,
  evaluateFieldComponentState,
} from './change-state';

const MAX_CHANGE_VALUE_LOOPS = 5;

let debouncedChangeValue;

export default function changeValue(formId, fieldId, value) {
  return (dispatch, getState) => new Promise((resolve) => {
    const dependencies = [];

    const { model, settings } = getState().forms[formId];

    if (!verifyValidValue(fieldId, model, value, resolve)) return;

    value = evaluateValue(fieldId, model, value);

    // set value to form
    setViewValueToStore(formId, fieldId, value, dependencies)(dispatch, getState);

    addCachedDebounceResolve(formId, fieldId, 'value', resolve);

    // evaluate field and run field dependencies
    debouncedChangeValue = debouncedChangeValue || debounce(debounceFunc, settings.changeValueDebounceWait,
      { maxWait: settings.changeValueDebounceMaxWait });
    handleDebounceFlush(formId, fieldId, 'lastUpdatedFieldValue', debouncedChangeValue);
    debouncedChangeValue(resolve, dispatch, getState, formId, fieldId, value, dependencies);
  });
}

const verifyValidValue = (fieldId, model, value, resolve) => {
  if (isFunction(value) && !model.fields[fieldId].component) {
    const ERROR_PREFIX = 'changeValue -';
    const error = createError(ERROR_PREFIX, errors.CHANGE_VALUE_UPDATER_NOT_SUPPORTED, { model, fieldId }, []);
    log.error(error);
    resolve();
    return false;
  }
  return true;
};

const setViewValueToStore = (formId, fieldId, value, dependencies = []) => (dispatch, getState) => {
  const { model } = getState().forms[formId];

  trackDependencies(formId, fieldId, value, dependencies);
  verifyFieldFormatterAndParserPair(fieldId, model);


  if (model.fields[fieldId].component) {
    // action set field component value (view value)
    dispatch(setFieldComponentValue(formId, fieldId, value));
  }
};

const debounceFunc = async (resolve, dispatch, getState, formId, fieldId, value, dependencies) => {
  // pass all resolve debounce calls to the action to be resolved at the end of the action when its resolved
  const debounceResolves = removeCachedDebounceResolve(formId, fieldId, 'value');

  // add the func action to the form pendingActions queue
  const action = createPendingAction(formId, fieldId, value, dependencies, resolve, debounceResolves);

  addPendingAction(formId, action)(getState, dispatch);
};

export const createPendingAction = (formId, fieldId, value, dependencies, resolve, debounceResolves) => ({
  type: Actions.CHANGE_VALUE,
  metadata: { formId, fieldId, value },
  func: executeAction,
  args: [formId, fieldId, value, dependencies],
  resolve,
  debounceResolves,
});

const executeAction = (formId, fieldId, value, dependencies) => async (dispatch, getState) => {
  // parse field view value to data value
  const { model, resources } = getState().forms[formId];

  // parse value
  const dataValue = await getFieldParsedValue(fieldId, model, resources, value);

  // action set field value
  dispatch(setFieldValue(formId, fieldId, dataValue));

  // parallel - handle field (evaluate + state changes) and handle dependencies changes
  await Promise.all([
    // exclude term, disable term and validations
    evaluateField(formId, fieldId)(dispatch, getState),
    // run dependencies changes
    evaluateDependentFields(fieldId, formId, dependencies)(dispatch, getState),
  ]);

  // action update form evaluation (invalid + dirty)
  setFormEvaluationResult(formId, getState, dispatch);
};

export const evaluateField = (formId, fieldId) => async (dispatch, getState) => {
  const form = getState().forms[formId];

  // calc exclude term
  const exclude = await evaluateTerm(fieldId, form.model, form.resources, 'excludeTerm', 'excluded');

  // if pass terms (exclude) - field is not part of the form - initiate its errors to empty array and disable to false
  if (exclude) {
    const field = form.model.fields[fieldId];

    // set field evaluation result - formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors
    dispatch(setFieldEvaluation(formId, fieldId, exclude, false, false, field.required, false, false, []));
    return;
  }

  const results = await Promise.all([
    // calc field disable term
    evaluateTerm(fieldId, form.model, form.resources, 'disableTerm', 'disabled'),
    // calc field dirty
    isFieldDirty(fieldId, form.model),
    // validate field
    validateField(fieldId, form.model, form.resources),
    // update component state
    evaluateFieldComponentState(formId, fieldId)(dispatch, getState),
  ]);

  // set field evaluation result - formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors
  dispatch(setFieldEvaluation(formId, fieldId, exclude, results[0], results[1], results[2].required,
    results[2].empty, results[2].invalid, results[2].errors));
};

// currently after each "change value" / "evaluate" of dependant field we dispatch "setFormEvaluation"
// we can improve it by waiting for the entire sub dependant fields to finish evaluate and only
// in the end update the form invalid value. But thats also might take more time for the invalid to be updated.
export const evaluateDependentFields = (fieldId, formId, dependencies) => async (dispatch, getState) => {
  const { model } = getState().forms[formId];
  const dependentFieldsIds = getDependentFieldsIds(fieldId, model);

  const dependenciesPromises = dependentFieldsIds.map((dependentFieldsId) => {
    const currStore = getState().forms[model.id];
    return evaluateDependenciesChange(formId, dependentFieldsId, dependencies, currStore)(dispatch, getState);
  });

  await Promise.all(dependenciesPromises);
};

const evaluateDependenciesChange = (formId, dependentFieldsId, dependencies = [], currStore) => async (dispatch, getState) => {
  const result = await getDependenciesChangeResult(dependentFieldsId, currStore.model, currStore.resources) || {};

  if (result === null) return;
  const promises = [];

  // the next order is important
  // first update the state in the store - since value change also triggers stateChange that needs the updated state
  if (result.state) {
    // set new state in the form
    setStateAndPrevStateToStore(formId, dependentFieldsId, result.state)(dispatch);
  }

  // value change also triggers stateChange and evaluate field
  if (Object.keys(result).includes('value')) { // new value can be falsy value as well, like undefined, null, 0, false
    promises.push(formantAndChangeValue(formId, dependentFieldsId, result.value, dependencies)(dispatch, getState));
  } else {
    if (result.state) {
      promises.push(evaluateFieldComponentState(formId, dependentFieldsId)(dispatch, getState));
    }

    promises.push(evaluateField(formId, dependentFieldsId)(dispatch, getState));
  }

  await Promise.all(promises);
};

const formantAndChangeValue = (formId, dependentFieldsId, dataValue, dependencies) => async (dispatch, getState) => {
  const { model, resources } = getState().forms[formId];
  const viewValue = await getFieldFormattedValue(dependentFieldsId, model, resources, dataValue, true);

  // set value to form & evaluate
  setViewValueToStore(model.id, dependentFieldsId, viewValue, dependencies)(dispatch, getState);
  await executeAction(model.id, dependentFieldsId, viewValue, dependencies)(dispatch, getState);
};

// verify field that if it defined formatter - then parser should be defined as well
// and the other way around
// note: this check is done here on runtime and not in the definition because its relevant only to editable components
// and some fields might only define formatter (for readonly components), but we cant predict on init if the
// component is editable, we can know its editable component only here when it called change value.
function verifyFieldFormatterAndParserPair(fieldId, model) {
  const field = model.fields[fieldId];
  const isMissing = field.component
    && ((field.formatter && !field.parser)
    || (!field.formatter && field.parser));
  if (isMissing) {
    const ERROR_PREFIX = 'Runtime form definition -';
    throwError(ERROR_PREFIX, errors.MISSING_FORMATTER_OR_PARSER, { model }, [fieldId]);
  }
}

function trackDependencies(formId, fieldId, value, dependencies) {
  dependencies.push({ fieldId, value });

  // if same field id and value return more than one time - throw a circular error
  const isSameValue = dependencies.filter(x => (x.fieldId === fieldId) && isEqual(x.value, value)).length > 1;

  // if the same id returned with different value - don't allow more than 10 loops
  // (user might didn't infinite loop like increasing the value by 1 each loop cycle)
  const isMaxLoops = dependencies.filter(x => x.fieldId === fieldId).length === MAX_CHANGE_VALUE_LOOPS;

  const prefix = 'Circular dependencies -';
  const dependenciesStr = dependencies.map(x => x.fieldId).join(' -> ');

  if (isSameValue) {
    throwError(prefix, errors.CIRCULAR_DEPENDENCIES, { dependencies }, [fieldId, formId, dependenciesStr]);
  }

  if (isMaxLoops) {
    throwError(prefix, errors.MAX_CIRCULAR_DEPENDENCIES_LOOPS, { dependencies },
      [
        fieldId, formId, MAX_CHANGE_VALUE_LOOPS, dependenciesStr,
      ]);
  }
}
