/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import reducer from './reducer';
import log from './log';
import { UiDispatches } from './actions/types';
import actions from './actions';

// getFormStore & setFormStore - represent object of { model, resources }
export default function handleAction(getFormStore, setFormStore) {
  return (actionType, actionArgs) => {
    // redux structure of getState & dispatch
    // will be useful if we implement jafar based on redux with single form to multi forms (and not form per instance)
    const getState = () => (!getFormStore() ? {
      forms: {},
    } : {
      forms: {
        [getFormStore().model.id]: getFormStore(),
      },
    });

    const dispatch = (action) => {
      // if action is function
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      // else action is object
      const { forms } = getState();
      const newForms = reducer(forms, action);
      const formId = Object.keys(newForms)[0];
      const newFormStore = newForms[formId];
      const isUiChange = UiDispatches.includes(action.type);
      setFormStore(newFormStore, action, isUiChange);

      log.debug(actionType, action, newFormStore, isUiChange);
    };

    return dispatch(actions[actionType](...actionArgs));
  };
}
