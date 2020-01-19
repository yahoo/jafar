---
id: replay
title: Replay Actions
sidebar_label: Replay Actions
---

Jafar's Form [hooks](hooks.html) exposes `afterAction` hook among others. Using this hook that gets args of the current form model and 
action information - one can store the form's history of actions in order to log user actions. Later the actions history can be used to
 automatically run the user's actions history in-order to track and debug reported bugs.

### Example 

 ```javascript
 import MyLocalStorageService from './local-storage-service.js';

const model = {
  // ...
};

const resources = {
  // ...
  hooks: {
    afterAction: ({ model, metadata, type }) => {
      const storageKey = `${model.id}-history`;
      const actionsHistory = MyLocalStorageService.get(storageKey);
      actionsHistory.push({ model, metadata, type });
      MyLocalStorageService.set(model.id);
    },
  },
};
 ```