/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import formMock from '../mocks/common';
import { testAction, testActions } from '../../src/actions/test-utils';
import { Dispatches, Actions } from '../../src/actions/types';
import { createPendingAction } from '../../src/actions/change-state';

describe('actions / changeState', () => {
  let form;

  beforeEach(() => {
    form = cloneDeep(formMock);

    Object.assign(form.resources.hooks, {
      beforeAction: jest.fn(),
      afterAction: jest.fn(),
      beforeChangeState: jest.fn(),
      afterChangeState: jest.fn(),
    });
  });

  it('dispatch actions', async () => {
    const fieldId = 'name';
    const state = { loading: true };
    const tracks = await testAction(form, Actions.CHANGE_STATE, [form.model.id, fieldId, state]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: true }
      Dispatches.ADD_ACTION, // add process to queue - changeState
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // name - change state
      Dispatches.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = {}
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: false }
      Dispatches.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = { isLoading: true }
      Dispatches.SHIFT_ACTION, // pop the first process in the queue - changeState
      Dispatches.END_ACTION, // name - end change state
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: true }
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { isLoading: false }
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalForm = tracks.privateForm[tracks.privateForm.length - 1].form;

    // verify field new state (after recursive set states happened
    const state2 = { loading: false };
    expect(finalForm.model.fields.name.component.state).toEqual(state2);
    expect(finalForm.model.fields.name.component.modelState).toEqual(state2);
    expect(finalForm.model.fields.name.component.prevState).toEqual(state);
    expect(finalForm.model.pendingActions).toEqual([]);

    // verify hooks
    const stateChangesStates = [state, state2];
    const pendingActions = [createPendingAction(form.model.id, fieldId, state, stateChangesStates, expect.any(Function),
      expect.any(Array))];
    const beforeModel = Object.assign({}, form.model, { pendingActions, processing: true });
    beforeModel.fields.name.component.state = state; // not actually before, because of the debounce
    const afterModel = Object.assign({}, finalForm.model, { pendingActions, processing: true });
    const metadata = { formId: form.model.id, fieldId, state };
    const beforeProps = {
 model: beforeModel, resources: form.resources, metadata, type: Actions.CHANGE_STATE,
};
    const afterProps = {
 model: afterModel, resources: form.resources, metadata, type: Actions.CHANGE_STATE,
};

    expect(finalForm.resources.hooks.beforeChangeState)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterChangeState)
      .toHaveBeenCalledWith(afterProps);
    expect(finalForm.resources.hooks.beforeAction)
      .toHaveBeenCalledWith(beforeProps);
    expect(finalForm.resources.hooks.afterAction)
      .toHaveBeenCalledWith(afterProps);
  });

  it('handle 2 actions with debounce and resolve both - ok', async () => {
    const fieldId = 'name';
    form.resources.components.inputText.stateChange = jest.fn();
    const initialState = { pageNumber: 0 };
    form.model.fields[fieldId].component.state = initialState;
    form.model.fields[fieldId].component.modelState = initialState;
    const state1 = { pageNumber: 1 };
    const state2 = { pageNumber: 2 };
    const actions = [
      { type: Actions.CHANGE_STATE, args: [form.model.id, fieldId, state1] },
      { type: Actions.CHANGE_STATE, args: [form.model.id, fieldId, state2] },
    ];

    const tracks = await testActions(form, actions);

    expect(form.resources.components.inputText.stateChange.mock.calls).toEqual([
      [{
        id: fieldId,
        value: 'Rachel',
        dependencies: {},
        componentValue: undefined,
        state: state2,
        prevValue: undefined,
        prevDependencies: undefined,
        prevComponentValue: undefined,
        prevState: initialState,
        context: {},
      }],
    ]);

    // see that all expected actions occurred
    expect(tracks.privateForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 1 }
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 2 }
      Dispatches.ADD_ACTION, // add process to queue - changeState
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.START_ACTION, // name - change state
      Dispatches.SET_FIELD_COMPONENT_PREV_STATE, // name - prevState = { pageNumber: 0 }
      Dispatches.SHIFT_ACTION, // pop the first process in the queue - changeState
      Dispatches.END_ACTION, // name - end change state
      Dispatches.END_PROCESSING, // end form processing
    ]);

    // see that all expected ui actions occurred
    expect(tracks.publicForm.map(x => x.action.type)).toEqual([
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 1 }
      Dispatches.SET_FIELD_COMPONENT_STATE, // name - state = { pageNumber: 2 }
      Dispatches.START_PROCESSING, // start form processing
      Dispatches.END_PROCESSING, // end form processing
    ]);

    const finalModel = tracks.privateForm[tracks.privateForm.length - 1].form.model;

    // verify field new state (after recursive set states happened)
    expect(finalModel.fields.name.component.state).toEqual({ pageNumber: 2 });
    expect(finalModel.fields.name.component.modelState).toEqual({ pageNumber: 2 });
    expect(finalModel.fields.name.component.prevState).toEqual({ pageNumber: 0 });
    expect(finalModel.pendingActions).toEqual([]);
  });
});
