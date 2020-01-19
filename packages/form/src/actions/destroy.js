/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  addPendingAction,
} from '../pending-actions';
import {
  removeForm,
} from './creator';
import {
  Actions,
} from './types';

export default function destroy(formId) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, resolve) => ({
  type: Actions.DESTROY,
  metadata: { formId },
  func: executeAction,
  args: [formId],
  resolve,
});

const executeAction = formId => async (dispatch) => {
  dispatch(removeForm(formId));
};
