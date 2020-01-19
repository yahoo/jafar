/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  addPendingAction,
} from '../pending-actions';
import {
  getFieldFormattedValue,
} from '../utils';
import {
  getEnrichedComponent,
} from '../definition';
import {
  verifyForm,
} from '../verification';
import {
  setFieldUi,
  setFieldComponentValue,
} from './creator';
import {
  Actions,
} from './types';
import {
  evaluateFieldComponentState,
} from './change-state';

export default function changeUi(formId, fieldId, ui = {}) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, fieldId, ui, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, fieldId, ui, resolve) => ({
  type: Actions.CHANGE_UI,
  metadata: {
    formId,
    fieldId,
    ui,
  },
  func: executeAction,
  args: [formId, fieldId, ui],
  resolve,
});

const executeAction = (formId, fieldId, ui) => async (dispatch, getState) => {
  const { model, resources, settings } = getState().forms[formId];

  const newUI = { ...ui };
  if (newUI.component) {
    newUI.component = getEnrichedComponent(newUI.component);
  }

  const potentialModel = getPotentialModel(model, fieldId, newUI);
  verifyForm({ model: potentialModel, resources, settings });

  // action - set field component
  dispatch(setFieldUi(formId, fieldId, newUI));

  // update component value (view value)
  await formatField(formId, fieldId)(dispatch, getState);

  // update component state
  await evaluateFieldComponentState(formId, fieldId)(dispatch, getState);
};

const getPotentialModel = (model, fieldId, ui) => {
  const potentialModel = Object.assign({}, model);
  potentialModel.fields[fieldId] = Object.assign({}, potentialModel.fields[fieldId], ui);
  return potentialModel;
};

const formatField = (formId, fieldId) => async (dispatch, getState) => {
  let form = getState().forms[formId];

  // if field.component defined - keep the view value in the form
  form = getState().forms[formId];
  if (form.model.fields[fieldId].component) {
    const viewValue = await getFieldFormattedValue(fieldId, form.model, form.resources);
    dispatch(setFieldComponentValue(formId, fieldId, viewValue));
  }
};
