/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { isUndefined } from 'lodash';

export function mapFieldToProps(id, model, resources) {
  const field = isUndefined(model) ? undefined : model.fields[id];
  // if the field is not defined, or the field.component not defined, or the core actions still didn't
  // formatted the field value into the component.value - then field is excluded
  if (isUndefined(field) || isUndefined(field.component) || !Object.keys(field.component).includes('value')) {
    return {
      id,
      excluded: true,
    };
  }

  const { renderer } = resources.components[field.component.name] || {};

  return {
    id,
    label: field.label,
    description: field.description,
    value: field.component.value,
    component: renderer,
    state: field.component.state,
    excluded: field.excluded,
    disabled: field.disabled,
    dirty: field.dirty,
    required: field.required,
    empty: field.empty,
    errors: field.errors,
    invalid: !(field.required && field.empty) && field.errors.length > 0, // required is not considered invalid in UX terms
  };
}
