
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Dispatches } from './types';

export function addAction(formId, action) {
  return {
    type: Dispatches.ADD_ACTION,
    formId,
    action,
  };
}

export function startProcessing(formId) {
  return {
    type: Dispatches.START_PROCESSING,
    formId,
  };
}

export function endProcessing(formId) {
  return {
    type: Dispatches.END_PROCESSING,
    formId,
  };
}

export function shiftAction(formId) {
  return {
    type: Dispatches.SHIFT_ACTION,
    formId,
  };
}

export function startAction(actionType, actionMetadata) {
  return {
    type: Dispatches.START_ACTION,
    actionType,
    actionMetadata,
  };
}

export function endAction(actionType, actionMetadata, duration) {
  return {
    type: Dispatches.END_ACTION,
    actionType,
    actionMetadata,
    duration,
  };
}

export function setForm(model, resources, settings) {
  return {
    type: Dispatches.SET_FORM,
    model,
    resources,
    settings,
  };
}

export function removeForm(formId) {
  return {
    type: Dispatches.REMOVE_FORM,
    formId,
  };
}

export function setFormEvaluation(formId, invalid, dirty, errors) {
  return {
    type: Dispatches.SET_FORM_EVALUATION,
    formId,
    invalid,
    dirty,
    errors,
  };
}

export function setFormInitializedData(formId, data) {
  return {
    type: Dispatches.SET_FORM_INITIALIZED_DATA,
    formId,
    data,
  };
}

export function setFormErrors(formId, errors) {
  return {
    type: Dispatches.SET_FORM_ERRORS,
    formId,
    errors,
  };
}

export function setFieldsErrors(formId, errors) {
  return {
    type: Dispatches.SET_FIELDS_ERRORS,
    formId,
    errors,
  };
}

export function setFormData(formId, data) {
  return {
    type: Dispatches.SET_FORM_DATA,
    formId,
    data,
  };
}

export function setFormContext(formId, context) {
  return {
    type: Dispatches.SET_FORM_CONTEXT,
    formId,
    context,
  };
}

export function setFieldUi(formId, fieldId, ui) {
  return {
    type: Dispatches.SET_FIELD_UI,
    formId,
    fieldId,
    ui,
  };
}

export function setFieldComponentState(formId, fieldId, state) {
  return {
    type: Dispatches.SET_FIELD_COMPONENT_STATE,
    formId,
    fieldId,
    state,
  };
}

export function setFieldComponentPrevState(formId, fieldId) {
  return {
    type: Dispatches.SET_FIELD_COMPONENT_PREV_STATE,
    formId,
    fieldId,
  };
}

export function setFieldComponentValue(formId, fieldId, value) {
  return {
    type: Dispatches.SET_FIELD_COMPONENT_VALUE,
    formId,
    fieldId,
    value,
  };
}

export function setFieldComponentValueBatch(formId, batch) {
  return {
    type: Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH,
    formId,
    batch,
  };
}

export function setFieldValue(formId, fieldId, value) {
  return {
    type: Dispatches.SET_FIELD_VALUE,
    formId,
    fieldId,
    value,
  };
}

export function setFieldEvaluation(formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors) {
  return {
    type: Dispatches.SET_FIELD_EVALUATION,
    formId,
    fieldId,
    excluded,
    disabled,
    dirty,
    required,
    empty,
    invalid,
    errors,
  };
}
