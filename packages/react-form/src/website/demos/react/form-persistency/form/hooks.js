import { Actions } from '@jafar/form';

const localStorageKey = 'user-form';

const saveFormToLocalStorage = ({ model, type }) => {
  if (type !== Actions.DESTROY) {
    localStorage.setItem(localStorageKey, JSON.stringify(model));
  }
};

export default {
  afterAction: saveFormToLocalStorage, // after each action - save form model to the local storage
};
