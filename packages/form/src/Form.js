/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { noop } from 'lodash';
import { Actions } from './actions/types';
import handleAction from './handle-action';

const internal = Symbol('internal');
const external = Symbol('external');

export default class Form {
  init(model, resources, settings, onUpdateForm = noop) {
    this[internal] = { model, resources, settings };
    this.onUpdateForm = onUpdateForm;
    return handle.call(this, Actions.INIT, [model, resources, settings]);
  }

  changeValue(fieldId, value) {
    return handle.call(this, Actions.CHANGE_VALUE, [this[internal].model.id, fieldId, value]);
  }

  changeState(fieldId, state) {
    return handle.call(this, Actions.CHANGE_STATE, [this[internal].model.id, fieldId, state]);
  }

  changeData(data) {
    return handle.call(this, Actions.CHANGE_DATA, [this[internal].model.id, data]);
  }

  changeContext(context) {
    return handle.call(this, Actions.CHANGE_CONTEXT, [this[internal].model.id, context]);
  }

  changeUi(fieldId, ui) {
    return handle.call(this, Actions.CHANGE_UI, [this[internal].model.id, fieldId, ui]);
  }

  submit() {
    return handle.call(this, Actions.SUBMIT, [this[internal].model.id]);
  }

  reset() {
    return handle.call(this, Actions.RESET, [this[internal].model.id]);
  }

  destroy() {
    return handle.call(this, Actions.DESTROY, [this[internal].model.id]);
  }

  get id() {
    return this[external].model.id;
  }

  get fields() {
    return this[external].model.fields;
  }

  get data() {
    return this[external].model.data;
  }

  get context() {
    return this[external].model.context;
  }

  get dirty() {
    return this[external].model.dirty;
  }

  get invalid() {
    return this[external].model.invalid;
  }

  get errors() {
    return this[external].model.errors;
  }

  get pendingActions() {
    return this[external].model.pendingActions;
  }
}

function handle(type, args) {
  const getState = () => this[internal];
  const setForm = (form, action, isUiAction) => {
    this[internal] = form;

    if (isUiAction) {
      this[external] = form;
      this.onUpdateForm(form);
    }
  };

  return handleAction(getState, setForm)(type, args);
}
