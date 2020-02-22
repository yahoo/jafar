---
id: persistency
title: Form Persistency
sidebar_label: Form Persistency
---

Form persistency can be accomplished by the following steps:
- Define a form model definition as a first form state and pass it to the Form component. 
It will be updated during the form's lifecycle. 
- Define an [afterAction](hooks#afteraction) hook to get the updated form model after each action and store it in a local-storage. 

```javascript
import { Actions } from '@jafar/form';

const localStorageKey = 'user-form';

const saveFormToLocalStorage = ({ model, type }) => {
  if (type !== Actions.DESTROY) {
    localStorage.setItem(localStorageKey, JSON.stringify(model));
  }
};

resources = {
  //...
  hooks: {
    afterAction: saveFormToLocalStorage,
  },
};
```

- On page load (on refresh) - restore the form model object from the local storage and pass it to the Form component in order to go back to the last state of the form - before the refresh.

```javascript
import form from './form';

const getModel = () => {
  // Retrieve the model from storage
  const prevModelStringify = localStorage.getItem(localStorageKey);
  return prevModelStringify ? JSON.parse(prevModelStringify) : form.model;
};

const model = getModel();

<Form model={model} resource={form.resources}>
```

See advanced demo in [Form Persistency Demo](https://yahoo.github.io/jafar/demo-react-form.html#/others/persistency/html).