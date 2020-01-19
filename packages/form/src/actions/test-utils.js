/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import handleAction from '../handle-action';

export async function testAction(initialStore, action, args) {
  const actions = [{ type: action, args }];
  const tracker = await testActions(initialStore, actions);
  return tracker;
}

export async function testActions(initialStore, actions) {
  // prepare tracker to the dispatch actions
  const tracker = { privateForm: [], publicForm: [] };

  // prepare handle action args
  let form = initialStore;
  const getFormStore = () => form;
  const setFormStore = (newStore, action, isUiAction) => {
    form = newStore;
    tracker.privateForm.push({ form, action });

    if (isUiAction) {
      tracker.publicForm.push({ form, action });
    }
  };

  const promises = actions.map(action => handleAction(getFormStore, setFormStore)(action.type, action.args));
  await Promise.all(promises);
  return tracker;
}
