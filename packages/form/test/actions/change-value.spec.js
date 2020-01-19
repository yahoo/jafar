/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { errors } from '../../src/errors';
import { testAction, testActions } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-value';
import log from '../../src/log';

describe('actions / changeValue', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDataChange: jest.fn(),
      afterDataChange: jest.fn(),
      beforeChangeValue: jest.fn(),
      afterChangeValue: jest.fn(),
    });
  });

  it('dispatch actions', async () => {
    const fieldId = 'name';
    const value = 'Formatted Monica';
    const tracks = await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, value]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Dispatches.ADD_ACTION, // add action to queue - changeValue
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // name - change value
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - change state
      Dispatches.SET_FIELD_COMPONENT_PREV_STATE, // name
      Dispatches.SET_FIELD_EVALUATION, // name (excluded, disabled and errors)
      Dispatches.SET_FIELD_EVALUATION, // last name (excluded, disabled and errors)
      Dispatches.SET_FORM_EVALUATION, // when finish field + dependant fields - form evaluation (form.invalid + form.dirty)
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - changeValue
      Dispatches.END_ACTION, // name - end change value
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - change state
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, value, [{ fieldId, value }], expect.any(Function),
      expect.any(Array))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.value = 'Formatted Monica'; // not actually before - because of the debounce
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, fieldId, value };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_VALUE,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_VALUE,
    };

    expect(finalForm.resources.hooks.beforeChangeValue)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeValue).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });

  it('change name value', async () => {
    const fieldId = 'name';
    const tracks = await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, 'Formatted Monica']);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    const { name, lastName } = finalModel.fields;

    // check form.data (didn't change)
    expect(finalModel.data).toEqual({ lastName: 'Green', name: 'Monica' });
    expect(finalModel.fields.name.component.value).toEqual('Formatted Monica');
    expect(finalModel.fields.name.component.state).toEqual({ mock: 1 });

    // check fields evaluation
    checkFieldEvaluation(name, false, false, [], true, false, false);
    checkFieldEvaluation(lastName, false, false, [], false, false, false);

    // check form evaluation
    expect(finalModel.invalid).toEqual(false);
    expect(finalModel.pendingActions).toEqual([]);
  });

  it('change name value - no parser and no formatter', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.formatter;
    delete form.model.fields.name.parser;

    const tracks = await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, 'Monica']);
    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
    const { name, lastName } = finalModel.fields;

    // check form.data (didn't change)
    expect(finalModel.data).toEqual({ lastName: 'Green', name: 'Monica' });
    expect(finalModel.fields.name.component.value).toEqual('Monica');
    expect(finalModel.fields.name.component.state).toEqual({ mock: 1 });

    // check fields evaluation
    checkFieldEvaluation(name, false, false, [], true, false, false);
    checkFieldEvaluation(lastName, false, false, [], false, false, false);

    // check form evaluation
    expect(finalModel.invalid).toEqual(false);
    expect(finalModel.pendingActions).toEqual([]);
  });

  it('change name value - only formatter defined', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.parser;
    let error;
      try {
        await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, 'Formatted Monica']);
      } catch (err) {
        error = err;
      }
      expect(error.code).toEqual(errors.MISSING_FORMATTER_OR_PARSER.code);
  });

  it('change name value - only parser defined', async () => {
    const fieldId = 'name';
    delete form.model.fields.name.formatter;
    let error;
      try {
        await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, 'Formatted Monica']);
      } catch (err) {
        error = err;
      }
      expect(error.code).toEqual(errors.MISSING_FORMATTER_OR_PARSER.code);
  });

  it('change name value - cause circular dependencies', async () => {
    delete form.model.fields.name.formatter;
    delete form.model.fields.lastName.formatter;
    delete form.model.fields.name.parser;
    delete form.model.fields.lastName.parser;
    form.model.fields.name.dependencies = ['lastName'];
    form.model.fields.name.dependenciesChange = { name: 'myDependenciesChange' };
    form.model.fields.lastName.dependencies = ['name'];
    form.model.fields.lastName.dependenciesChange = { name: 'myDependenciesChange' };
    form.resources.dependenciesChanges = {
      myDependenciesChange: {
        func: ({ value }) => ({ value: value + 1 }),
      },
    };
    const orgError = log.error;
    let error;
    log.error = (err) => { error = err; };
    const fieldId = 'name';
    const value = 12;
    const tracks = await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, value]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name
      Dispatches.ADD_ACTION,
      Dispatches.START_PROCESSING,
      Dispatches.START_ACTION,
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_VALUE, // lastName
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_VALUE, // lastName
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_VALUE, // lastName
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_VALUE, // lastName
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SHIFT_ACTION,
      Dispatches.END_ACTION,
      Dispatches.END_PROCESSING,
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - set component value (view value)
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_VALUE,
      Dispatches.SET_FIELD_COMPONENT_VALUE,
      Dispatches.SET_FIELD_COMPONENT_VALUE,
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, value, [{ fieldId, value }], expect.any(Function),
      expect.any(Array))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.value = 12; // not actually before - because of the debounce
  
    // verify error
    expect(error.code).toEqual(errors.ACTION_FAILED.code);
    expect(error.subError.code).toEqual(errors.MAX_CIRCULAR_DEPENDENCIES_LOOPS.code);
    log.error = orgError;

    expect(finalForm.resources.hooks.beforeChangeValue).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterChangeValue).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterAction).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeDataChange) .toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterDataChange).not.toHaveBeenCalled();
  });

  it('change name value - cause circular dependencies - same value', async () => {
    delete form.model.fields.name.component;
    delete form.model.fields.name.formatter;
    delete form.model.fields.lastName.formatter;
    delete form.model.fields.name.parser;
    delete form.model.fields.lastName.parser;
    delete form.model.data;
    form.model.fields.name.dependencies = ['lastName'];
    form.model.fields.name.dependenciesChange = { name: 'nameDependenciesChange' };
    form.model.fields.lastName.dependencies = ['name'];
    form.model.fields.lastName.dependenciesChange = { name: 'lastNameDependenciesChange' };
    form.resources.dependenciesChanges = {
      nameDependenciesChange: {
        func: ({ value }) => ({ value: 2 }),
      },
      lastNameDependenciesChange: {
        func: ({ value }) => ({ value: 3}),
      },
    };
    const orgError = log.error;
    let error;
    log.error = (err) => { error = err; };
    const fieldId = 'name';
    const value = 1;
    const tracks = await testAction(form, Actions.CHANGE_VALUE, [form.model.id, fieldId, value]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - changeValue
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // name - change value
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_VALUE, // lastName
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_VALUE, // name
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - changeValue
      Dispatches.END_ACTION, // name - end change value
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify error
    expect(error.code).toEqual(errors.ACTION_FAILED.code);
    expect(error.subError.code).toEqual(errors.CIRCULAR_DEPENDENCIES.code);
    log.error = orgError;

    // verify hooks
    expect(finalForm.resources.hooks.beforeChangeValue).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterChangeValue).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterAction).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeDataChange) .toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterDataChange).not.toHaveBeenCalled();
  });

  it('handle 2 actions with debounce and resolve both - ok', async () => {
    const fieldId = 'name';
    const value1 = 'Formatted Ross';
    const value2 = 'Formatted Ben';
    const actions = [
      { type: Actions.CHANGE_VALUE, args: [form.model.id, fieldId, value1] },
      { type: Actions.CHANGE_VALUE, args: [form.model.id, fieldId, value2] },
    ];

    const tracks = await testActions(form, actions);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - Ross
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - Ben
      Dispatches.ADD_ACTION, // add process to queue - Ross
      Dispatches.START_PROCESSING, // start form processing - Ben
      Dispatches.START_ACTION, // name - Ben
      Dispatches.SET_FIELD_VALUE, // name - Ben
      Dispatches.SET_FIELD_EVALUATION, // name - Ben (excluded, disabled and errors)
      Dispatches.SET_FIELD_EVALUATION, // last name (excluded, disabled and errors)
      Dispatches.SET_FORM_EVALUATION, // when finish field + dependant fields - form evaluation (form.invalid + form.dirty)
      Dispatches.SHIFT_ACTION, // pop the first process in the queue - changeState
      Dispatches.END_ACTION, // name - Ben - end change state
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - Ross
      Dispatches.SET_FIELD_COMPONENT_VALUE, // name - Ben
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;

    // verify field new value
    expect(finalModel.fields.name.component.value).toEqual(value2);
    expect(finalModel.data.name).toEqual('Ben');
    expect(finalModel.pendingActions).toEqual([]);
  });

  function checkFieldEvaluation(field, excluded, disabled, errors, dirty, required, empty) {
    expect(field.excluded).toEqual(excluded);
    expect(field.disabled).toEqual(disabled);
    expect(field.errors).toEqual(errors);
    expect(field.dirty).toEqual(dirty);
    expect(field.required).toEqual(required);
    expect(field.empty).toEqual(empty);
  }
});
