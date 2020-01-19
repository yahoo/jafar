/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-data';

describe('actions / changeData', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      toDto: jest.fn(x => x.data),
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeDataChange: jest.fn(),
      afterDataChange: jest.fn(),
      beforeChangeData: jest.fn(),
      afterChangeData: jest.fn(),
    });
  });

  it('dispatch actions', async () => {
    const data = { name: 'Monica', lastName: 'Geller' };
    const tracks = await testAction(form, Actions.CHANGE_DATA, [form.model.id, data]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - changeDate
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start - change form data
      Dispatches.SET_FORM_DATA, // set form data
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { mock: 1 }
      Dispatches.SET_FIELD_COMPONENT_PREV_STATE, // name
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Dispatches.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - changeData
      Dispatches.END_ACTION, // end - change form data
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { mock: 1 }
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify new data
    expect(finalForm.model.data).toEqual(data);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, data, expect.any(Function))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, data };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_DATA,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_DATA,
    };
    const toDtoProps = {
      data,
    };

    expect(finalForm.resources.hooks.toDto).toHaveBeenCalledWith(toDtoProps);
    expect(finalForm.resources.hooks.beforeChangeData).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeData).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeDataChange).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterDataChange).toHaveBeenCalledWith(afterProps);
  });
});
