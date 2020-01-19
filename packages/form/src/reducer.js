/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  set,
  unset,
  isEmpty,
  cloneDeep,
  clone as cloneShallow,
} from 'lodash';
import { Dispatches } from './actions/types';
import { isFieldEmpty } from './utils';

export default function reducer(forms = {}, action = {}) {
  switch (action.type) {
    case Dispatches.SET_FORM:
      {
        const newForms = {
          [action.model.id]: {
            model: action.model,
            resources: action.resources,
            settings: action.settings,
          },
        };
        return newForms;
      }
    case Dispatches.REMOVE_FORM:
      {
        const newForms = cloneShallow(forms);
        delete newForms[action.formId];
        return newForms;
      }
    case Dispatches.ADD_ACTION:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.pendingActions = cloneShallow(newForms[action.formId].model.pendingActions);
        newForms[action.formId].model.pendingActions.push(action.action);
        return newForms;
      }
    case Dispatches.START_PROCESSING:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.processing = true;
        return newForms;
      }
    case Dispatches.END_PROCESSING:
      {
        if (!forms[action.formId]) return cloneShallow(forms);
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.processing = false;
        return newForms;
      }
    case Dispatches.SHIFT_ACTION:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.pendingActions = cloneShallow(newForms[action.formId].model.pendingActions);
        newForms[action.formId].model.pendingActions.shift();
        return newForms;
      }
    case Dispatches.SET_FORM_DATA:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.data = action.data || {};
        return newForms;
      }
    case Dispatches.SET_FORM_CONTEXT:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.context = action.context || {};
        return newForms;
      }
    case Dispatches.SET_FIELDS_ERRORS:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        Object.keys(action.errors).forEach((fieldId) => {
          const field = cloneShallowField(newForms, { formId: action.formId, fieldId });
          const errors = action.errors[fieldId] || [];
          field.errors = errors;
          field.invalid = !isEmpty(field.errors);
        });
        return newForms;
      }
    case Dispatches.SET_FORM_ERRORS:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.errors = action.errors || {};
        newForms[action.formId].model.invalid = !isEmpty(action.errors);
        return newForms;
      }
    case Dispatches.SET_FORM_INITIALIZED_DATA:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.initializedData = action.data || {};
        return newForms;
      }
    case Dispatches.SET_FORM_EVALUATION:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        newForms[action.formId].model.invalid = action.invalid || false;
        newForms[action.formId].model.dirty = action.dirty || false;
        newForms[action.formId].model.errors = action.errors || {};
        return newForms;
      }
    case Dispatches.SET_FIELD_VALUE:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const { model } = newForms[action.formId];
        const field = model.fields[action.fieldId];
        model.prevData = cloneDeep(model.data);
        model.data = cloneDeep(model.data); // need deep copy for complex deep path like "a.b.c[2]"
        set(model.data, field.path, action.value); // isFieldEmpty needs the value already set in the data for the check
        if (isFieldEmpty(action.fieldId, model)) {
          unset(model.data, field.path);
        }
        return newForms;
      }
      case Dispatches.SET_FIELD_EVALUATION:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const field = cloneShallowField(newForms, action);
        field.excluded = action.excluded;
        field.disabled = action.disabled;
        field.errors = action.errors || [];
        field.dirty = action.dirty;
        field.required = action.required;
        field.empty = action.empty;
        field.invalid = action.invalid;
        return newForms;
      }
    case Dispatches.SET_FIELD_UI:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const field = cloneShallowField(newForms, action);
        Object.assign(field, action.ui);
        return newForms;
      }
      case Dispatches.SET_FIELD_COMPONENT_STATE:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const field = cloneShallowField(newForms, action);
        field.component = cloneShallow(field.component);
        field.component.state = action.state || {};
        return newForms;
      }
      case Dispatches.SET_FIELD_COMPONENT_PREV_STATE:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const field = cloneShallowField(newForms, action);
        field.component = cloneShallow(field.component);
        field.component.prevState = cloneDeep(field.component.modelState);
        field.component.modelState = cloneDeep(field.component.state);
        return newForms;
      }
      case Dispatches.SET_FIELD_COMPONENT_VALUE:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const field = cloneShallowField(newForms, action);
        updateFieldComponentValue(field, action.value);
        return newForms;
      }
      case Dispatches.SET_FIELD_COMPONENT_VALUE_BATCH:
      {
        const newForms = cloneShallowModel(forms, action.formId);
        const { model } = newForms[action.formId];
        model.fields = cloneShallow(model.fields);
        Object.keys(action.batch).forEach((fieldId) => {
          model.fields[fieldId] = cloneShallow(model.fields[fieldId]);
          const field = model.fields[fieldId];
          updateFieldComponentValue(field, action.batch[fieldId]);
        });
        return newForms;
      }
    default:
      return forms;
  }
}

function cloneShallowModel(forms, formId) {
  const newForms = cloneShallow(forms);
  newForms[formId] = cloneShallow(newForms[formId]);
  newForms[formId].model = cloneShallow(newForms[formId].model);
  return newForms;
}

function cloneShallowField(newForms, action) {
  const { model } = newForms[action.formId];
  model.fields = cloneShallow(model.fields);
  model.fields[action.fieldId] = cloneShallow(model.fields[action.fieldId]);
  const field = model.fields[action.fieldId];
  return field;
}

function updateFieldComponentValue(field, viewValue) {
  field.component = cloneShallow(field.component);
  field.component.prevValue = cloneDeep(field.component.value);
  field.component.value = viewValue;
}
