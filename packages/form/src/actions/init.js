/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  createForm,
} from '../definition';
import {
  verifyForm,
} from '../verification';
import {
  getFieldFormattedValue,
} from '../utils';
import {
  addPendingAction,
} from '../pending-actions';
import { getToDtoProps } from '../handlers-props';
import {
  setForm,
  setFormData,
  setFormInitializedData,
  setFieldComponentValueBatch,
} from './creator';
import {
  Actions,
} from './types';
import {
  setFormEvaluationResult,
} from './common';
import {
  evaluateField,
  evaluateDependentFields,
} from './change-value';


export default function init(model, resources, settings) {
  return (dispatch, getState) => new Promise((resolve) => {
    const form = createForm(model, resources, settings);
    verifyForm(form);

    // action - announce set form
    dispatch(setForm(form.model, form.resources, form.settings));

    // add the func action to the form pendingActions queue
    const action = createPendingAction(form.model.id, resolve);

    addPendingAction(form.model.id, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, resolve) => ({
  type: Actions.INIT,
  metadata: { formId },
  func: executeAction,
  args: [formId],
  resolve,
});

export const executeAction = formId => async (dispatch, getState) => {
  // if persist model - evaluate form not needed
  const { model, resources } = getState().forms[formId];
  if (model.initializedData) return;

  // run toDto hook and set result to the store
  const props = getToDtoProps(model.data);
  const dtoData = await resources.hooks.toDto(props);
  dispatch(setFormData(formId, dtoData));

  // evaluate form
  await evaluateForm(formId)(dispatch, getState);

  // action - set initialized data
  const initializedData = getState().forms[formId].model.data;
  dispatch(setFormInitializedData(formId, initializedData));
};

export const evaluateForm = formId => async (dispatch, getState) => {
  // set formatted view values in one batch
  await formatFields(formId)(dispatch, getState);

  // init fields
  const { fields } = getState().forms[formId].model;
  const initFieldsPromises = Object.keys(fields).map(fieldId => initField(formId, fieldId)(dispatch, getState));
  await Promise.all(initFieldsPromises);

  // action update form invalid
  setFormEvaluationResult(formId, getState, dispatch);
};

const initField = (formId, fieldId) => async (dispatch, getState) => {
  // parallel - handle field (format, evaluate, state changes) and handle dependencies changes
  await Promise.all([
    // evaluate field - exclude term, disable term, validations and dirty, component state
    evaluateField(formId, fieldId)(dispatch, getState),
    // run dependencies changes
    evaluateDependentFields(fieldId, formId)(dispatch, getState),
  ]);
};

const formatFields = formId => async (dispatch, getState) => {
  // format all fields
  const form = getState().forms[formId];
  const formatFieldsPromises = Object.keys(form.model.fields)
    .map(fieldId => getFieldFormattedValue(fieldId, form.model, form.resources));
  const viewValues = await Promise.all(formatFieldsPromises);

  const batch = {};
  Object.keys(form.model.fields).forEach((fieldId, index) => {
    if (form.model.fields[fieldId].component) {
      batch[fieldId] = viewValues[index];
    }
  });

  // set fields view values to store
  if (Object.keys(batch).length) {
    dispatch(setFieldComponentValueBatch(formId, batch));
  }
};
