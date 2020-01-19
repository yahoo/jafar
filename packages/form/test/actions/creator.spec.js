/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  startAction,
  endAction,
  setForm,
  removeForm,
  setFormEvaluation,
  setFormData,
  setFormContext,
  setFormInitializedData,
  setFieldUi,
  setFieldComponentState,
  setFieldComponentValue,
  setFieldValue,
  setFieldEvaluation,
 } from '../../src/actions/creator';

describe('actions / creator', () => {
  it('startAction - return correct action', () => {
    const actionType = 'INIT';
    const actionMetadata = { formId: 'simple' };
    const action = startAction(actionType, actionMetadata);

    expect(action).toEqual({ type: 'START_ACTION', actionType, actionMetadata });
  });

  it('endAction - return correct action', () => {
    const actionType = 'INIT';
    const actionMetadata = { formId: 'simple' };
    const duration = 23;
    const action = endAction(actionType, actionMetadata, duration);

    expect(action).toEqual({ type: 'END_ACTION', actionType, actionMetadata, duration });
  });

  it('setForm - return correct action', () => {
    const model = { id: 'simple' };
    const resources = { hi: 'you' };
    const settings = { a: 'b' };
    const action = setForm(model, resources, settings);

    expect(action).toEqual({ type: 'SET_FORM', model, resources, settings });
  });

  it('removeForm - return correct action', () => {
    const formId = 'simple';
    const action = removeForm(formId);

    expect(action).toEqual({ type: 'REMOVE_FORM', formId });
  });

  it('setFormEvaluation - return correct action', () => {
    const formId = 'simple';
    const invalid = true;
    const dirty = true;
    const errors = { name: [] };
    const action = setFormEvaluation(formId, true, true, errors);

    expect(action).toEqual({
      type: 'SET_FORM_EVALUATION', formId, invalid, dirty, errors
    });
  });

  it('setFormData - return correct action', () => {
    const formId = 'simple';
    const data = { name: 'Ross' };
    const action = setFormData(formId, data);

    expect(action).toEqual({ type: 'SET_FORM_DATA', formId, data });
  });

  it('setFormContext - return correct action', () => {
    const formId = 'simple';
    const context = { userId: '123' };
    const action = setFormContext(formId, context);

    expect(action).toEqual({ type: 'SET_FORM_CONTEXT', formId, context });
  });

  it('setFormInitializedData - return correct action', () => {
    const formId = 'simple';
    const data = { name: 'Ross' };
    const action = setFormInitializedData(formId, data);

    expect(action).toEqual({ type: 'SET_FORM_INITIALIZED_DATA', formId, data });
  });

  it('setFieldUi - return correct action', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const component = { name: 'inputNumber' };
    const ui = { component };
    const action = setFieldUi(formId, fieldId, ui);

    expect(action).toEqual({
      type: 'SET_FIELD_UI', formId, fieldId, ui,
    });
  });

  it('setFieldUi - return correct action - with parser and formatter', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const component = { name: 'inputNumber' };
    const formatter = { name: 'newFormatter' };
    const parser = { parser: 'newParser' };
    const ui = { component, formatter, parser }
    const action = setFieldUi(formId, fieldId, ui);

    expect(action).toEqual({
      type: 'SET_FIELD_UI', formId, fieldId, ui
    });
  });

  it('setFieldComponentState - return correct action', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const state = { placeholder: 'Enter...' };
    const action = setFieldComponentState(formId, fieldId, state);

    expect(action).toEqual({
      type: 'SET_FIELD_COMPONENT_STATE', formId, fieldId, state,
    });
  });

  it('setFieldComponentValue - return correct action', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const value = 18;
    const action = setFieldComponentValue(formId, fieldId, value);

    expect(action).toEqual({
      type: 'SET_FIELD_COMPONENT_VALUE', formId, fieldId, value,
    });
  });

  it('setFieldValue - return correct action', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const value = 25;
    const action = setFieldValue(formId, fieldId, value);

    expect(action).toEqual({
      type: 'SET_FIELD_VALUE', formId, fieldId, value,
    });
  });

  it('setFieldEvaluation - return correct action', () => {
    const formId = 'simple';
    const fieldId = 'age';
    const excluded = true;
    const disabled = false;
    const errors = [];
    const dirty = false;
    const required = false;
    const empty = false;
    const invalid = false;
    const action = setFieldEvaluation(formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors);

    expect(action).toEqual({
      type: 'SET_FIELD_EVALUATION', formId, fieldId, excluded, disabled, dirty, required, empty, invalid, errors,
    });
  });
});
