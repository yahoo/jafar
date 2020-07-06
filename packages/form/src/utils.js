/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isEqual,
  isFunction,
  isPlainObject,
  get,
} from 'lodash';
import {
  getIsEmptyProps,
  getEmptyMessageProps,
  getFieldTermsProps,
  getFieldEvaluateValueProps,
  getFieldEvaluateStateProps,
  getFieldComponentStateChangesProps,
  getFieldComponentFormatterProps,
  getFieldComponentParserProps,
  getFieldDependenciesChangeProps,
  getFieldValidatorFuncProps,
  getFieldValidatorMessageProps,
} from './handlers-props';
import isTermTruthy from './term-evaluator';
import hooks from './hooks';

const isPromise = result => result && isFunction(result.then);

export const evaluateValue = (fieldId, model, value) => (isFunction(value)
  ? value(getFieldEvaluateValueProps(fieldId, model)) : value);

export const evaluateState = (fieldId, model, state) => (isFunction(state)
  ? state(getFieldEvaluateStateProps(fieldId, model)) : state);

export const isFieldDirty = (fieldId, model) => {
  if (!model.initializedData) return false;
  const initializedValue = get(model.initializedData, model.fields[fieldId].path);
  const currentValue = get(model.data, model.fields[fieldId].path);
  return !isEqual(initializedValue, currentValue);
};

export function isFormDirty(model) {
  return Object.values(model.fields).filter(field => !field.excluded).some(field => field.dirty);
}

export function isFormInvalid(model) {
  return Object.values(model.fields).filter(field => !field.excluded).some(field => field.invalid);
}

export const isFieldEmpty = (fieldId, model) => {
  const props = getIsEmptyProps(fieldId, model);
  return hooks.isEmpty(props);
};

export function getFormErrors(model) {
  const errors = {};
  Object.keys(model.fields).filter(fieldId => !model.fields[fieldId].excluded).forEach((fieldId) => {
    if (model.fields[fieldId].errors.length) {
      errors[fieldId] = model.fields[fieldId].errors;
    }
  });
  return errors;
}

export function evaluateTerm(id, model, resources, termName, flagName) {
    const fieldTerms = model.fields[id][termName];
    if (!fieldTerms) {
      return Promise.resolve(model.fields[id][flagName]);
    }
    const getTermsProps = (term, defaultArgs) => getFieldTermsProps(id, model, term.args, defaultArgs);
    return isTermTruthy(fieldTerms, resources.terms, getTermsProps);
}

export function validateField(id, model, resources) {
  return new Promise(async (resolve) => {
    const field = model.fields[id];

    // calc require term
    let { required } = field;
    if (field.requireTerm) {
      required = await evaluateTerm(id, model, resources, 'requireTerm', 'required');
    }

    // handle empty value
    if (isFieldEmpty(id, model)) {
      const errors = !required ? [] : [{
        name: 'required',
        message: hooks.emptyMessage(getEmptyMessageProps(id, model)),
      }];
      resolve({
 errors, required, empty: true, invalid: errors.length > 0,
});
      return;
    }

    // run validators when value not empty
    const errors = [];
    const asyncValidators = [];

    (field.validators || []).forEach((validator) => {
      const validatorFunc = resources.validators[validator.name].func;
      const { defaultArgs } = resources.validators[validator.name];

      const props = getFieldValidatorFuncProps(id, model, validator.name, defaultArgs);
      const result = validatorFunc(props);
      if (isPromise(result)) {
        asyncValidators.push({
 id, validatorName: validator.name, defaultArgs, promise: result,
});
      } else {
        const valid = isPlainObject(result) ? result.valid : result;
        const dynamicArgs = isPlainObject(result) ? result.args : undefined;
        if (!valid) {
          const validatorName = validator.name;
          errors.push({
            name: validatorName,
            message: getFieldErrorMessage(id, model, resources, validatorName, defaultArgs, dynamicArgs),
          });
        }
      }
    });

    Promise.all(asyncValidators.map(x => x.promise)).then((values) => {
      values.forEach((result, index) => {
        const valid = isPlainObject(result) ? result.valid : result;
        const dynamicArgs = isPlainObject(result) ? result.args : undefined;
        if (!valid) {
          const item = asyncValidators[index];
          errors.push({
            name: item.validatorName,
            message: getFieldErrorMessage(id, model, resources, item.validatorName, item.defaultArgs, dynamicArgs),
          });
        }
      });
      resolve({
 required, errors, empty: false, invalid: errors.length > 0,
});
    });
  });
}

export function getDependentFieldsIds(id, model) {
  return Object.keys(model.fields).filter(fieldId => (model.fields[fieldId].dependencies || []).includes(id));
}

export function getDependenciesChangeResult(id, model, resources) {
  return new Promise((resolve) => {
    const field = model.fields[id];

    if (!field.dependenciesChange) {
      return resolve(undefined); // dependent field still evaluates
    }

    const defaultDependenciesChange = () => {};
    const dependenciesChange = resources.dependenciesChanges[field.dependenciesChange.name].func || defaultDependenciesChange;
    const { defaultArgs } = resources.dependenciesChanges[field.dependenciesChange.name];
    const props = getFieldDependenciesChangeProps(id, model, defaultArgs);

    if (isEqual(props.dependencies, props.prevDependencies)) {
      return resolve(null); // stops circular loops
    }

    const result = dependenciesChange(props);

    return !isPromise(result) ? resolve(result) : result.then((resolveResult) => {
      resolve(resolveResult);
    });
  });
}

export function getFieldComponentStateChanges(id, model, resources) {
  return new Promise((resolve) => {
    const field = model.fields[id];

    if (!field.component || !resources.components[field.component.name].stateChange) {
      resolve(undefined);
      return;
    }

    const func = resources.components[field.component.name].stateChange;
    const props = getFieldComponentStateChangesProps(id, model);
    const result = func(props);

    return !isPromise(result) ? resolve(result) : result.then((resolveResult) => {
      resolve(resolveResult);
    });
  });
}

export function getFieldFormattedValue(id, model, resources, dataValue, isUseDataValue) {
  const finalDataValue = isUseDataValue ? dataValue : get(model.data, model.fields[id].path);

  return getFieldConversionResult(id, model, finalDataValue, resources.conversions, 'formatter',
    getFieldComponentFormatterProps, true);
}

export function getFieldParsedValue(id, model, resources, viewValue) {
  return getFieldConversionResult(id, model, viewValue, resources.conversions, 'parser', getFieldComponentParserProps);
}

function getFieldConversionResult(id, model, defaultResolve, resources, fieldKey, getPropsFunc, useDefaultResolveAdPropsValue) {
  return new Promise((resolve) => {
    const field = model.fields[id];

    if (!field.component || !field[fieldKey]) {
      resolve(defaultResolve);
      return;
    }

    const { func } = resources[field[fieldKey].name];
    const { defaultArgs } = resources[field[fieldKey].name];
    const { args } = field[fieldKey];
    const props = getPropsFunc(id, model, args, defaultArgs);

    if (useDefaultResolveAdPropsValue) {
      props.value = defaultResolve;
    }
    const result = func(props);

    return !isPromise(result) ? resolve(result) : result.then((resolveResult) => {
      resolve(resolveResult);
    });
  });
}

function getFieldErrorMessage(fieldId, model, resources, errorName, defaultArgs, dynamicArgs) {
  const validatorProps = getFieldValidatorMessageProps(fieldId, model, errorName, defaultArgs, dynamicArgs);
  return resources.validators[errorName].message(validatorProps);
}
