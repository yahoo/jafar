/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { createForm } from '../../src/definition';
import { testAction } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/init';

describe('actions / init', () => {
  let form;

  beforeEach(() => {
    form = cloneDeep(formMock);

    delete form.model.initializedData;

    Object.assign(form.resources.hooks, {
      toDto: jest.fn(x => x.data),
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDataChange: jest.fn(),
      afterDataChange: jest.fn(),
      beforeInit: jest.fn(),
      afterInit: jest.fn(),
    });
  });
  it('dispatch actions', async () => {
    const tracks = await testAction(undefined, Actions.INIT, [form.model, form.resources]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FORM, // set form to the form
      Dispatches.ADD_ACTION, // add action to queue - init
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start init form
      Dispatches.SET_FORM_DATA, // set toDto data result
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Dispatches.SET_FORM_INITIALIZED_DATA, // after finish init all fields - sent initialized data
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - init
      Dispatches.END_ACTION, // end init form
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.END_PROCESSING, // end form processing
    ]);
  });


  it('init ok', async () => {
    const tracks = await testAction(undefined, Actions.INIT, [form.model, form.resources]);
    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    const { name, lastName } = finalForm.model.fields;

    // check form.data (didn't change)
    expect(finalForm.model.data).toEqual(form.model.data);

    // check fields ui state
    expect(name.component.state).toEqual({});
    expect(name.component.value).toEqual('Formatted Rachel');
    expect(lastName.component).toEqual(undefined);

    // check fields evaluations (excluded, disabled and errors)
    checkFieldEvaluation(name, false, false, []);
    checkFieldEvaluation(lastName, false, false, []);

    // check form evaluation
    expect(finalForm.model.invalid).toEqual(false);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, createForm(form.model, form.resources).model, { pendingActions, processing: true, context });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id };
    const beforeProps = {
      model: beforeModel, resources: expect.any(Object), metadata, type: Actions.INIT,
    };
    const afterProps = {
      model: afterModel, resources: expect.any(Object), metadata, type: Actions.INIT,
    };
    const toDtoProps = { data: form.model.data };

    expect(finalForm.resources.hooks.toDto).toHaveBeenCalledWith(toDtoProps);
    expect(finalForm.resources.hooks.beforeInit).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterInit).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });

  it('not evaluate form when model is persist model (has initializedData)', async () => {
    form.model.initializedData = { name: 'Rachel' };

    const tracks = await testAction(undefined, Actions.INIT, [form.model, form.resources]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FORM, // set form to the form
      Dispatches.ADD_ACTION, // add action to queue - init
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start init form
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - init
      Dispatches.END_ACTION, // end init form
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // verify hooks
    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, createForm(form.model, form.resources).model, { pendingActions, processing: true, context });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id };
    const beforeProps = {
      model: beforeModel, resources: expect.any(Object), metadata, type: Actions.INIT,
    };
    const afterProps = {
      model: afterModel, resources: expect.any(Object), metadata, type: Actions.INIT,
    };

    expect(finalForm.resources.hooks.toDto).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.beforeInit).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterInit).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });

  describe('fields dependencies', () => {
    beforeEach(() => {
      Object.assign(form.model, {
        fields: {
          country: { path: 'country' },
          city: {
            path: 'city',
            dependencies: ['country'],
            excludeTerm: { name: 'empty', args: { fieldId: 'country' } },
          },
        },
        data: {},
      });
    });

    it('sets city excluded', async () => {
      const tracks = await testAction(undefined, Actions.INIT, [form.model, form.resources]);
      const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
      const { country, city } = finalModel.fields;

      // check fields evaluations (excluded, disabled and errors)
      checkFieldEvaluation(country, false, false, []);
      checkFieldEvaluation(city, true, false, []);

      // check form evaluation
      expect(finalModel.invalid).toEqual(false);
    });

    it('sets city disabled and errors', async () => {
      Object.assign(form.model.fields.city, {
        disableTerm: form.model.fields.city.excludeTerm,
        excludeTerm: undefined,
        required: true,
      });

      const tracks = await testAction(undefined, Actions.INIT, [form.model, form.resources]);
      const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;
      const { country, city } = finalModel.fields;

      // check fields evaluations (excluded, disabled and errors)
      checkFieldEvaluation(country, false, false, []);
      checkFieldEvaluation(city, false, true, [{ name: 'required', message: 'Field required' }]);

      // check form evaluation
      expect(finalModel.invalid).toEqual(true);
    });
  });

  function checkFieldEvaluation(field, excluded, disabled, errors) {
    expect(field.excluded).toEqual(excluded);
    expect(field.disabled).toEqual(disabled);
    expect(field.errors).toEqual(errors);
  }
});
