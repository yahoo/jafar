/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-context';

describe('actions / changeContext', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeContext: jest.fn(),
      afterChangeContext: jest.fn(),
    });
  });

  it('dispatch actions', async () => {
    const context = { userId: '888', companyId: '789' };

    const tracks = await testAction(form, Actions.CHANGE_CONTEXT, [form.model.id, context]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - changeDate
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start - change form context
      Dispatches.SET_FORM_CONTEXT, // set form context
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.SET_FIELD_EVALUATION, // name
      Dispatches.SET_FIELD_EVALUATION, // lastName
      Dispatches.SET_FIELD_EVALUATION, // lastName (dependent on name)
      Dispatches.SET_FORM_EVALUATION, // after finish init all fields - form evaluation
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - changeContext
      Dispatches.END_ACTION, // end - change form context
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH, // name
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify new context
    expect(finalForm.model.context).toEqual(context);

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, context, expect.any(Function))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, context };
    const beforeProps = {
 model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_CONTEXT,
};
    const afterProps = {
 model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_CONTEXT,
};

    expect(finalForm.resources.hooks.beforeChangeContext).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeContext).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });
});
