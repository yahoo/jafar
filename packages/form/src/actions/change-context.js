/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  addPendingAction,
} from '../pending-actions';
import {
  evaluateForm,
} from './init';
import {
  setFormContext,
} from './creator';
import {
  Actions,
} from './types';

export default function changeContext(formId, context) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, context, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, context, resolve) => ({
  type: Actions.CHANGE_CONTEXT,
  metadata: { formId, context },
  func: executeAction,
  args: [formId, context],
  resolve,
});

const executeAction = (formId, context) => async (dispatch, getState) => {
  // action - set context
  dispatch(setFormContext(formId, context));

  await evaluateForm(formId)(dispatch, getState);
};
