/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  debounce,
  isEqual,
} from 'lodash';
import {
  evaluateState,
  getFieldComponentStateChanges,
} from '../utils';
import {
  addPendingAction,
} from '../pending-actions';
import {
  addCachedDebounceResolve,
  removeCachedDebounceResolve,
  handleDebounceFlush,
} from './common';
import {
  setFieldComponentState,
  setFieldComponentPrevState,
} from './creator';
import {
  Actions,
} from './types';

let debouncedChangeState;

export default function changeState(formId, fieldId, state) {
  return (dispatch, getState) => new Promise((resolve) => {
    const stateChangesStates = [];

    const { model, settings } = getState().forms[formId];

    state = evaluateState(fieldId, model, state);

    // set component state in the form
    setStateToStore(formId, fieldId, state, stateChangesStates)(dispatch);

    addCachedDebounceResolve(formId, fieldId, 'state', resolve);

    debouncedChangeState = debouncedChangeState || debounce(debounceFunc, settings.changeStateDebounceWait,
      { maxWait: settings.changeStateDebounceMaxWait });
    handleDebounceFlush(formId, fieldId, 'lastUpdatedFieldState', debouncedChangeState);
    debouncedChangeState(resolve, dispatch, getState, formId, fieldId, state, stateChangesStates);
  });
}

const setStateToStore = (formId, fieldId, state, stateChangesStates) => (dispatch) => {
  trackStateChanges(state, stateChangesStates);

  // set component state in the form
  dispatch(setFieldComponentState(formId, fieldId, state));
};

const debounceFunc = async (resolve, dispatch, getState, formId, fieldId, state, stateChangesStates) => {
  // pass all resolve debounce calls to the action to be resolved at the end of the action when its resolved
  const debounceResolves = removeCachedDebounceResolve(formId, fieldId, 'state');

  // add the func action to the form pendingActions queue
  const action = createPendingAction(formId, fieldId, state, stateChangesStates, resolve, debounceResolves);

  addPendingAction(formId, action)(getState, dispatch);
};

export const createPendingAction = (formId, fieldId, state, stateChangesStates, resolve, debounceResolves) => ({
  type: Actions.CHANGE_STATE,
  metadata: { formId, fieldId, state },
  func: executeAction,
  args: [formId, fieldId, stateChangesStates],
  resolve,
  debounceResolves,
});

const executeAction = (formId, fieldId, stateChangesStates) => async (dispatch, getState) => {
  dispatch(setFieldComponentPrevState(formId, fieldId));
  await evaluateFieldComponentState(formId, fieldId, stateChangesStates)(dispatch, getState);
};

export const evaluateFieldComponentState = (formId, fieldId, stateChangesStates = []) => async (dispatch, getState) => {
  let form = getState().forms[formId];

  const newState = await getFieldComponentStateChanges(fieldId, form.model, form.resources);
  if (!newState) {
    return;
  }

  form = getState().forms[formId];
  const currState = form.model.fields[fieldId].component.state || {};
  if (isEqual(currState, newState)) {
    return;
  }

  await changeAndEvaluateFieldComponentState(formId, fieldId, newState, stateChangesStates)(dispatch, getState);
};

export const setStateAndPrevStateToStore = (formId, fieldId, state, stateChangesStates = []) => (dispatch) => {
  // set new state in the form
  setStateToStore(formId, fieldId, state, stateChangesStates)(dispatch);
  dispatch(setFieldComponentPrevState(formId, fieldId));
};

const changeAndEvaluateFieldComponentState = (formId, fieldId, state,
  stateChangesStates = []) => async (dispatch, getState) => {
  setStateAndPrevStateToStore(formId, fieldId, state, stateChangesStates)(dispatch);

  await evaluateFieldComponentState(formId, fieldId, stateChangesStates)(dispatch, getState);
};

function trackStateChanges(state, stateChangesStates) {
  stateChangesStates.push(state);
}
