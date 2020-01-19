/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import log from '../../src/log';
import { errors } from '../../src/errors';
import { testAction } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
 import { createPendingAction } from '../../src/actions/submit';

describe('actions / submit', () => {
  let form;
  beforeEach(() => {
    form = cloneDeep(formMock);
    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeSubmit: jest.fn(),
      afterSubmit: jest.fn(),
      submit: jest.fn(),
      fromDto: jest.fn(x => x.data),
      validate: jest.fn(),
    });
  });

  it('dispatch actions - sync submit', async () => {
    const tracks = await testAction(form, Actions.SUBMIT, [form.model.id]);

    // see that all expected Dispatches occurred
    verifyDispatches(tracks);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true, context });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true, context });
    const metadata = { formId: form.model.id };
    const beforeProps = {
 model: beforeModel, resources: form.resources, metadata, type: Actions.SUBMIT,
};
    const afterProps = {
 model: afterModel, resources: form.resources, metadata, type: Actions.SUBMIT,
};
    const fromDtoProps = { data: form.model.data };
    const submitProps = { data: form.model.data, context };

    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.beforeSubmit).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.fromDto).toHaveBeenCalledWith(fromDtoProps);
    expect(finalForm.resources.hooks.submit).toHaveBeenCalledWith(submitProps);
    expect(finalForm.resources.hooks.afterSubmit).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });

  it('dispatch actions - async submit', async () => {
    let asyncSubmitCalled;
    form.resources.hooks.submit = () => new Promise((resolve) => {
        setTimeout(() => {
          asyncSubmitCalled = true;
          resolve();
        }, 1);
      });
    const tracks = await testAction(form, Actions.SUBMIT, [form.model.id]);

    // see that all expected Dispatches occurred
    verifyDispatches(tracks);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true, context });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true, context });
    const metadata = { formId: form.model.id };
    const beforeProps = {
 model: beforeModel, resources: form.resources, metadata, type: Actions.SUBMIT,
};
    const afterProps = {
 model: afterModel, resources: form.resources, metadata, type: Actions.SUBMIT,
};

    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.beforeSubmit).toHaveBeenCalledWith(beforeProps);
    expect(asyncSubmitCalled).toBeTruthy();
    expect(finalForm.resources.hooks.afterSubmit).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });

  it('dispatch actions - async form validation', async () => {
    let asyncValidationCalled;
    form.resources.hooks.validate = () => new Promise((resolve) => {
        setTimeout(() => {
          asyncValidationCalled = true;
          resolve({ lastName: [{ name: 'unique', error: 'Already exists' }] });
        }, 1);
      });
    const tracks = await testAction(form, Actions.SUBMIT, [form.model.id]);

    // see that all expected Dispatches occurred
    verifyWithValidationDispatches(tracks);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const context = { userId: '123', companyId: '789' };
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true, context });
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true, context });
    const metadata = { formId: form.model.id };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.SUBMIT,
    };
    const afterProps = {
      model: afterModel, resources: form.resources, metadata, type: Actions.SUBMIT,
    };

    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.beforeSubmit).toHaveBeenCalledWith(beforeProps);
    expect(asyncValidationCalled).toBeTruthy();
    expect(finalForm.resources.hooks.afterSubmit).toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.afterAction).toHaveBeenCalledWith(afterProps);
  });

  it('submit throw error - due to model.invalid', async () => {
    form.model.invalid = true;
    const orgError = log.error;
    let error;
    log.error = (err) => { error = err; };
    const tracks = await testAction(form, Actions.SUBMIT, [form.model.id]);

    // see that all expected Dispatches occurred
    verifyDispatches(tracks);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify hooks
    const pendingActions = [createPendingAction(form.model.id, expect.any(Function))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id };
    const beforeProps = {
      model: beforeModel, resources: form.resources, metadata, type: Actions.SUBMIT,
    };

    expect(finalForm.resources.hooks.beforeAction).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.beforeSubmit).toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.fromDto).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.submit).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterSubmit).not.toHaveBeenCalled();
    expect(finalForm.resources.hooks.afterAction).not.toHaveBeenCalled();

    // verify error
    expect(error.code).toEqual(errors.ACTION_FAILED.code);
    expect(error.subError.code).toEqual(errors.INVALID_SUBMIT.code);

    log.error = orgError;
  });

  function verifyDispatches(tracks) {
    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - submit
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start - submit
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - submit
      Dispatches.END_ACTION, // end - submit
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);
  }

  function verifyWithValidationDispatches(tracks) {
    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.ADD_ACTION, // add action to queue - submit
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // start - submit
      Dispatches.SET_FIELDS_ERRORS, // set fields errors
      Dispatches.SET_FORM_ERRORS, // sent form errors
      Dispatches.SHIFT_ACTION, // pop the first action in the queue - submit
      Dispatches.END_ACTION, // end - submit
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);
  }
});
