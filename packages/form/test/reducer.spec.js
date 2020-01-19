/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import reducer from '../src/reducer';
import * as creator from '../src/actions/creator';

describe('reducer', () => {
  let model;
  let resources;
  let forms;
  let expectNewForms;
  let action;
  let newForms;
  beforeEach(() => {
    model = {
      id: 'simple',
      fields: { name: { path: 'name', component: { name: 'inputText', state: {} } } },
      data: { name: 'Rachel' },
      invalid: false,
      processing: false,
      pendingActions: [],
    };
    resources = {
      conversions: {},
    };
    forms = {
      [model.id]: { 
        model: cloneDeep(model), 
        resources: cloneDeep(resources),
      },
    };
    expectNewForms = {
      [model.id]: { 
        model: cloneDeep(model), 
        resources: cloneDeep(resources),
      },
    };
  });

  it('action: SET_FORM', () => {
    action = creator.setForm(model, resources);
    forms = {};
    checkBasics();
  });

  it('action: REMOVE_FORM', () => {
    action = creator.removeForm(model.id);
    expectNewForms = {};
    checkBasics();
  });

  describe('action: SET_FORM_DATA', () => {
    it('data is defined', () => {
      const data = { name: 'Ross' };
      action = creator.setFormData(model.id, data);
      expectNewForms[model.id].model.data = data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
    });

    it('data undefined', () => {
      action = creator.setFormData(model.id);
      expectNewForms[model.id].model.data = {};
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
    });
  });

  describe('action: SET_FORM_CONTEXT', () => {
    it('data is defined', () => {
      const context = { userId: '123' };
      action = creator.setFormContext(model.id, context);
      expectNewForms[model.id].model.context = context;
      checkBasics();
      expect(forms[model.id].model.context !== newForms[model.id].model.context).toBeTruthy();
    });

    it('data undefined', () => {
      action = creator.setFormContext(model.id);
      expectNewForms[model.id].model.context = {};
      checkBasics();
      expect(forms[model.id].model.context !== newForms[model.id].model.context).toBeTruthy();
    });
  });

  describe('action: SET_FORM_INITIALIZED_DATA', () => {
    it('data is defined', () => {
      const data = { name: 'Ross' };
      action = creator.setFormInitializedData(model.id, data);
      expectNewForms[model.id].model.initializedData = data;
      checkBasics();
      expect(forms[model.id].model.initializedData !== newForms[model.id].model.initializedData).toBeTruthy();
    });

    it('data undefined', () => {
      action = creator.setFormInitializedData(model.id);
      expectNewForms[model.id].model.initializedData = {};
      checkBasics();
      expect(forms[model.id].model.initializedData !== newForms[model.id].model.initializedData).toBeTruthy();
    });
  });


  describe('action: START_PROCESSING', () => {
    it('set model.processing to true', () => {
      action = creator.startProcessing(model.id);
      expectNewForms[model.id].model.processing = true;
      checkBasics();
      expect(forms[model.id].model.processing !== newForms[model.id].model.processing).toBeTruthy();
    });
  });

  describe('action: END_PROCESSING', () => {
    it('form is defined - set model.processing to false', () => {
      forms[model.id].model.processing = true;
      action = creator.endProcessing(model.id);
      expectNewForms[model.id].model.processing = false;
      checkBasics();
      expect(forms[model.id].model.processing !== newForms[model.id].model.processing).toBeTruthy();
    });

    it('form is undefined', () => {
      delete forms[model.id];
      action = creator.endProcessing(model.id);
      expectNewForms[model.id] = undefined;
      checkBasics();
      expect(forms[model.id] === newForms[model.id]).toBeTruthy();
    });
  });

  describe('action: ADD_ACTION', () => {
    it('add action to an empty array', () => {
      const userAction = { type: 'CHANGE_DATA' };
      action = creator.addAction(model.id, userAction);
      expectNewForms[model.id].model.pendingActions.push(userAction);
      checkBasics();
      expect(forms[model.id].model.pendingActions !== newForms[model.id].model.pendingActions).toBeTruthy();
    });

    it('add action to non empty array', () => {
      const userAction1 = { type: 'CHANGE_DATA' };
      forms[model.id].model.pendingActions.push(userAction1);
      const userAction2 = { type: 'CHANGE_VALUE' };
      action = creator.addAction(model.id, userAction2);
      expectNewForms[model.id].model.pendingActions.push(userAction1);
      expectNewForms[model.id].model.pendingActions.push(userAction2);
      checkBasics();
      expect(forms[model.id].model.pendingActions !== newForms[model.id].model.pendingActions).toBeTruthy();
    });
  });

  describe('action: SHIFT_ACTION', () => {
    it('shift action to an non empty array', () => {
      const userAction1 = { type: 'CHANGE_DATA' };
      forms[model.id].model.pendingActions.push(userAction1);
      action = creator.shiftAction(model.id);
      checkBasics();
      expect(forms[model.id].model.pendingActions !== newForms[model.id].model.pendingActions).toBeTruthy();
      expect(forms[model.id].model.pendingActions).toEqual([userAction1]);
      expect(expectNewForms[model.id].model.pendingActions).toEqual([]);
    });
  });

  describe('action: SET_FORM_EVALUATION', () => {
    it('invalid, dirty and errors are defined', () => {
      const invalid = true;
      const dirty = true;
      const errors = { firstName: [{ name: 'minLength', message: 'Min length is 3' }] };
      action = creator.setFormEvaluation(model.id, invalid, dirty, errors);
      expectNewForms[model.id].model.invalid = invalid;
      expectNewForms[model.id].model.dirty = dirty;
      expectNewForms[model.id].model.errors = errors;
      checkBasics();
    });

    it('invalid, dirty and errors are undefined', () => {
      action = creator.setFormEvaluation(model.id);
      expectNewForms[model.id].model.invalid = false;
      expectNewForms[model.id].model.dirty = false;
      expectNewForms[model.id].model.errors = {};
      checkBasics();
    });
  });

  describe('action: SET_FIELD_VALUE', () => {
    it('value is string', () => {
      const newValue = 'Ross';
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is number', () => {
      const newValue = 23;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is number zero', () => {
      const newValue = 0;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is empty string', () => {
      const newValue = '';
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = undefined;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is empty array', () => {
      const newValue = [];
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = undefined;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is empty object', () => {
      const newValue = {};
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = undefined;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is null', () => {
      const newValue = null;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = undefined;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value undefined', () => {
      const newValue = undefined;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is true', () => {
      const newValue = true;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is false', () => {
      const newValue = false;
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });

    it('value is date', () => {
      const newValue = new Date(Date.UTC(2019, 3, 18));
      action = creator.setFieldValue(model.id, 'name', newValue);
      expectNewForms[model.id].model.data.name = newValue;
      expectNewForms[model.id].model.prevData = model.data;
      checkBasics();
      expect(forms[model.id].model.data !== newForms[model.id].model.data).toBeTruthy();
      expect(newForms[model.id].model.prevData !== newForms[model.id].model.data).toBeTruthy();
    });
  });

  describe('action: SET_FIELD_EVALUATION', () => {
    it('call with all params', () => {
      action = creator.setFieldEvaluation(model.id, 'name', true, false, true, true, true, true, []);
      Object.assign(expectNewForms[model.id].model.fields.name, {
        excluded: true,
        disabled: false,
        errors: [],
        dirty: true,
        required: true,
        empty: true,
        invalid: true,
      });
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
    });

    it('errors undefined', () => {
      action = creator.setFieldEvaluation(model.id, 'name', true, false);
      Object.assign(expectNewForms[model.id].model.fields.name, {
        excluded: true,
        disabled: false,
        errors: [],
      });
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
    });
  });

  describe('action: SET_FIELD_COMPONENT_STATE', () => {
    it('set field component state', () => {
      action = creator.setFieldComponentState(model.id, 'name', { placeholder: 'Enter name' });
      expectNewForms[model.id].model.fields.name.component.state.placeholder = 'Enter name';
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.state
        !== newForms[model.id].model.fields.name.component.state).toBeTruthy();
    });

    it('state undefined', () => {
      action = creator.setFieldComponentState(model.id, 'name');
      expectNewForms[model.id].model.fields.name.component.state = {};
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component
        !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.state
        !== newForms[model.id].model.fields.name.component.state).toBeTruthy();
    });
  });

  describe('action: SET_FIELD_COMPONENT_PREV_STATE', () => {
    it('set field component prev state', () => {
      forms[model.id].model.fields.name.component.state = { a: 2 };
      forms[model.id].model.fields.name.component.modelState = { a: 1 };
      forms[model.id].model.fields.name.component.prevState = { a: 0 };

      action = creator.setFieldComponentPrevState(model.id, 'name');

      expectNewForms[model.id].model.fields.name.component.state = { a: 2 };
      expectNewForms[model.id].model.fields.name.component.modelState = { a: 2 };
      expectNewForms[model.id].model.fields.name.component.prevState = { a: 1 };

      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.state
        === newForms[model.id].model.fields.name.component.state).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.prevState
        !== newForms[model.id].model.fields.name.component.prevState).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.modelState
        !== newForms[model.id].model.fields.name.component.modelState).toBeTruthy();
    });
  });

  describe('action: SET_FIELD_COMPONENT_VALUE', () => {
    it('set field component value', () => {
      forms[model.id].model.fields.name.component.prevValue = 'Formatted Chandler';
      forms[model.id].model.fields.name.component.value = 'Formatted Monica';
      action = creator.setFieldComponentValue(model.id, 'name', 'Formatted Rachel');
      expectNewForms[model.id].model.fields.name.component.prevValue = 'Formatted Monica';
      expectNewForms[model.id].model.fields.name.component.value = 'Formatted Rachel';
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.value
        !== newForms[model.id].model.fields.name.component.value).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.prevValue
        !== newForms[model.id].model.fields.name.component.prevValue).toBeTruthy();
    });

    it('action: SET_FIELD_COMPONENT_VALUE, value undefined (its a valid value)', () => {
      action = creator.setFieldComponentValue(model.id, 'name', undefined);
      expectNewForms[model.id].model.fields.name.component.value = undefined;
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
    });
  });

  describe('action: SET_FIELD_COMPONENT_VALUE_BATCH', () => {
    it('set field component value batch', () => {
      forms[model.id].model.fields.name.component.prevValue = 'Formatted Chandler';
      forms[model.id].model.fields.name.component.value = 'Formatted Monica';
      action = creator.setFieldComponentValueBatch(model.id, { name: 'Formatted Rachel' });
      expectNewForms[model.id].model.fields.name.component.prevValue = 'Formatted Monica';
      expectNewForms[model.id].model.fields.name.component.value = 'Formatted Rachel';
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.value
        !== newForms[model.id].model.fields.name.component.value).toBeTruthy();
      expect(forms[model.id].model.fields.name.component.prevValue
        !== newForms[model.id].model.fields.name.component.prevValue).toBeTruthy();
    });

    it('action: SET_FIELD_COMPONENT_VALUE_BATCH, one value undefined (its a valid value)', () => {
      action = creator.setFieldComponentValueBatch(model.id, { name: undefined });
      expectNewForms[model.id].model.fields.name.component.value = undefined;
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
    });
  });


  describe('action: SET_FIELD_UI', () => {
    it('set filed component', () => {
      const ui = { component: { name: 'text' } };
      action = creator.setFieldUi(model.id, 'name', ui);
      expectNewForms[model.id].model.fields.name.component = ui.component;
      checkBasics();
      expect(forms[model.id].model.fields !== newForms[model.id].model.fields).toBeTruthy();
      expect(forms[model.id].model.fields.name !== newForms[model.id].model.fields.name).toBeTruthy();
      expect(forms[model.id].model.fields.name.component !== newForms[model.id].model.fields.name.component).toBeTruthy();
      expect(forms[model.id].resources.formatters === newForms[model.id].resources.formatters).toBeTruthy();
      expect(forms[model.id].resources.parsers === newForms[model.id].resources.parsers).toBeTruthy();
    });
  });

  it('action: unknown', () => {
    action = {};
    newForms = reducer(forms, action);
    expect(newForms).toEqual(expectNewForms);
    expect(forms === newForms).toBeTruthy();
  });

  it('action: undefined and forms undefined', () => {
    newForms = reducer();
    expect(newForms).toEqual({});
  });

  function checkBasics() {
    newForms = reducer(forms, action);
    expect(newForms).toEqual(expectNewForms);
    expect(forms !== newForms).toBeTruthy();
  }
});
