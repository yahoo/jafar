/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isUndefined,
  merge,
  cloneDeep,
} from 'lodash';
import transpileForm from './transpile';
import validators from './validators';
import terms from './terms';
import conversions from './conversions';
import hooks from './hooks';
import settings from './settings';

let formNumber = 0;

export function createForm(initialModel = {}, initialResources = {}, initialSettings = {}) {
  const { model, resources } = transpileForm({ model: initialModel, resources: initialResources });
  return {
    model: createModel(model),
    resources: createResources(resources),
    settings: createSettings(initialSettings),
  };
}

function createId() {
  formNumber += 1;
  return `form-${formNumber}`;
}

function createModel(initialModel) {
  // we cant allow users to change the form internal fields outside jafar, since it will not trigger the form's lifecycle and
  // also can harm the form validity and cause runtime unexpected errors (for example - by removing one of the model.validators)
  const model = cloneDeep(initialModel);

  let result = {
    id: model.id || createId(),
    initializedData: model.initializedData || undefined,
    prevData: model.prevData || undefined,
    data: model.data || {},
    fields: model.fields || {},
    context: model.context || {},
    dirty: isUndefined(model.dirty) ? false : model.dirty,
    invalid: isUndefined(model.invalid) ? false : model.invalid,
    errors: model.errors || {},
    pendingActions: [], // no model.pendingActions - because the resolve func of actions will be undefined after form persistency
    processing: false,
  };

  // if config supplied excluded - use it (on persistent form), otherwise - if config supplied excludeTerm
  // put field with excluded true, until it excluded will be calculated on init.
  Object.values(result.fields).forEach((field) => {
    Object.assign(field, {
      excluded: isUndefined(field.excluded) ? !isUndefined(field.excludeTerm) : field.excluded,
      disabled: isUndefined(field.disabled) ? !isUndefined(field.disableTerm) : field.disabled,
      required: isUndefined(field.required) ? !isUndefined(field.requireTerm) : field.required,
      dirty: isUndefined(field.dirty) ? false : field.dirty,
      empty: isUndefined(field.empty) ? false : field.empty,
      invalid: isUndefined(field.invalid) ? false : field.invalid,
      errors: field.errors || [],
      dependencies: field.dependencies || undefined,
      context: field.context || undefined,
      formatter: field.formatter || undefined,
      parser: field.parser || undefined,
      component: field.component ? getEnrichedComponent(field.component) : undefined,
    });
  });

  // apply custom object fields to the result
  result = Object.assign(model, result);
  // here - to enable persist form after refresh page and enable reset to the initial model before refresh
  result.initialModel = result.initialModel || { ...result };
  return result;
}

export function getEnrichedComponent(component) {
  // do not add a default of "value": undefined - to the component, since undefined is a valid component value
  // this should be calculated by the formatter and only then to be applied to the field.component
  return Object.assign({
    name: undefined,
    state: {}, // view state - changes on each action, before debounce. used by ui (cuz same as modelState at that point)
    modelState: component.state || {}, // model state - changed only when debounce evaluates (for prevState usage)
    prevState: undefined,
    prevValue: undefined,
  }, component);
}

function createResources(initialResources) {
  // we cant allow users to change the form internal fields outside jafar, since it will not trigger the form's lifecycle and
  // also can harm the form validity and cause runtime unexpected errors (for example - by removing one of the model.validators)
  const resources = cloneDeep(initialResources);

  let result = {
    components: resources.components || {},
    dependenciesChanges: resources.dependenciesChanges || {},
    validators: merge(cloneDeep(validators), resources.validators || {}),
    conversions: merge(cloneDeep(conversions), resources.conversions || {}),
    terms: merge(cloneDeep(terms), resources.terms || {}),
    hooks: merge(cloneDeep(hooks), resources.hooks || {}),
  };

  // apply custom object fields to the result
  result = Object.assign(resources, result);
  return result;
}

function createSettings(initialSettings) {
  return merge(cloneDeep(settings), initialSettings || {});
}
