
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-ui';

describe('actions / changeUi', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeUi: jest.fn(),
      afterChangeUi: jest.fn(),
    });
    form.resources.components.mockComponent = {
      renderer: () => {},
    };    
  });

  it('changeUi - ok', async () => {
    const fieldId = 'name';
    const label = 'a';
    const description = 'b';
    const component = { name: 'mockComponent' };
    const expectedComponent = { 
      name: 'mockComponent', 
      value: 'formatter2-Rachel',
      state: {},
      modelState: {},
      prevState: undefined,
      prevValue: undefined,
    };
    const formatter = { name: 'formatter2' };
    const parser = { name: 'parser2' };
    const ui = { label, description, component, formatter, parser };
    form.resources.conversions = {
      formatter2: { func: ({ value }) => `formatter2-${value}` },
      parser2: { func: ({ value }) => value.replace('formatter2-', '') },
    };

    const tracks = await testAction(form, Actions.CHANGE_UI, [form.model.id, fieldId, ui]);
    expect(tracks.privateForm).toHaveLength(8);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    expect(finalForm.model.fields.name.component).toEqual(expectedComponent);
    expect(finalForm.model.fields.name.formatter).toEqual(formatter);
    expect(finalForm.model.fields.name.parser).toEqual(parser);
    expect(finalForm.model.fields.name.label).toEqual(label);
    expect(finalForm.model.fields.name.description).toEqual(description);
    
    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, ui, expect.any(Function))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, fieldId, ui };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_UI,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_UI,
    };

    expect(finalForm.resources.hooks.beforeChangeUi)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeUi)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('changeUi - with undefined ui - ok', async () => {
    const fieldId = 'lastName';
    const ui = undefined;
  
    const tracks = await testAction(form, Actions.CHANGE_UI, [form.model.id, fieldId, ui]);
    expect(tracks.privateForm).toHaveLength(7);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;
    
    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, fieldId, {}, expect.any(Function))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, fieldId, ui: {} };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_UI,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_UI,
    };

    expect(finalForm.resources.hooks.beforeChangeUi)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeUi)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('dispatch actions', async () => {
    const component = { name: 'mockComponent' };
    const ui = { component };
    const tracks = await testAction(form, Actions.CHANGE_UI, [form.model.id, 'name', ui]);

    // see that all expected actions
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - changeUi
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start change field component
      Dispatches.SET_FIELD_UI, // change field component
      Dispatches.SET_FIELD_COMPONENT_VALUE, // change field component value
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - changeUi
      Dispatches.END_ACTION, // end change field component
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_VALUE, // change field component value
      Dispatches.END_PROCESSING, // end form processing
    ]);
  });
});
