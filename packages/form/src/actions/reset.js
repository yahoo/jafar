/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  addPendingAction,
} from '../pending-actions';
import {
  Actions,
} from './types';
import {
  executeAction as executeActionInit,
} from './init';
import {
  setForm,
} from './creator';

export default function reset(formId) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, resolve) => ({
  type: Actions.RESET,
  metadata: { formId },
  func: executeAction,
  args: [formId],
  resolve,
});

const executeAction = formId => async (dispatch, getState) => {
  const { model, resources, settings } = getState().forms[formId];

  // action - announce set form
  const initialModel = Object.assign({}, model.initialModel, { initialModel: { ...model.initialModel } });
  dispatch(setForm(initialModel, resources, settings));

  await executeActionInit(formId)(dispatch, getState);
};
