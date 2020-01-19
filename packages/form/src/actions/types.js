/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

// form actions - each action is a process that calls some sub actions (dispatched)
// during its lifecycle to update the form store
export const Actions = {
  INIT: 'INIT',
  CHANGE_UI: 'CHANGE_UI',
  CHANGE_STATE: 'CHANGE_STATE',
  CHANGE_VALUE: 'CHANGE_VALUE',
  CHANGE_DATA: 'CHANGE_DATA',
  CHANGE_CONTEXT: 'CHANGE_CONTEXT',
  SUBMIT: 'SUBMIT',
  RESET: 'RESET',
  DESTROY: 'DESTROY',
};

// sub actions (dispatches)
export const Dispatches = {
  ADD_ACTION: 'ADD_ACTION',
  START_PROCESSING: 'START_PROCESSING',
  END_PROCESSING: 'END_PROCESSING',
  START_ACTION: 'START_ACTION',
  END_ACTION: 'END_ACTION',
  SHIFT_ACTION: 'SHIFT_ACTION',
  SET_FORM: 'SET_FORM',
  REMOVE_FORM: 'REMOVE_FORM',
  SET_FORM_EVALUATION: 'SET_FORM_EVALUATION',
  SET_FORM_INITIALIZED_DATA: 'SET_FORM_INITIALIZED_DATA',
  SET_FORM_DATA: 'SET_FORM_DATA',
  SET_FORM_CONTEXT: 'SET_FORM_CONTEXT',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  SET_FIELDS_ERRORS: 'SET_FIELDS_ERRORS',
  SET_FIELD_VALUE: 'SET_FIELD_VALUE',
  SET_FIELD_EVALUATION: 'SET_FIELD_EVALUATION',
  SET_FIELD_COMPONENT_STATE: 'SET_FIELD_COMPONENT_STATE',
  SET_FIELD_COMPONENT_PREV_STATE: 'SET_FIELD_COMPONENT_PREV_STATE',
  SET_FIELD_UI: 'SET_FIELD_UI',
  SET_FIELD_COMPONENT_VALUE: 'SET_FIELD_COMPONENT_VALUE',
  SET_FIELD_COMPONENT_VALUE_BATCH: 'SET_FIELD_COMPONENT_VALUE_BATCH',
};

// ui sub actions (ui dispatches)
// only when calling these dispatches during action process - will the Form class call a callback of
// "onUpdateForm" in order that using ui Form components can update there data
export const UiDispatches = [
  Dispatches.START_PROCESSING, // start processing
  Dispatches.END_PROCESSING, // end processing
  Dispatches.SET_FIELD_COMPONENT_STATE, // component state change
  Dispatches.SET_FIELD_COMPONENT_VALUE, // component view value change
  Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // batch component view value change (on init)
];
