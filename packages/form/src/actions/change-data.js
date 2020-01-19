/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  addPendingAction,
} from '../pending-actions';
import { getToDtoProps } from '../handlers-props';
import {
  evaluateForm,
} from './init';
import {
  setFormData,
} from './creator';
import {
  Actions,
} from './types';

export default function changeData(formId, data) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, data, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, data, resolve) => ({
  type: Actions.CHANGE_DATA,
  metadata: { formId, data },
  func: executeAction,
  args: [formId, data],
  resolve,
});

const executeAction = (formId, data) => async (dispatch, getState) => {
  const { resources } = getState().forms[formId];

  // run toDto hook and set result to the store
  const props = getToDtoProps(data);
  const dtoData = await resources.hooks.toDto(props);
  dispatch(setFormData(formId, dtoData));

  await evaluateForm(formId)(dispatch, getState);
};
