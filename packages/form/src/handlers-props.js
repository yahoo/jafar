/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { get } from 'lodash';

/*
props:
  state,
*/
export function getFieldEvaluateStateProps(id, model) {
  const field = model.fields[id];
  const props = { state: field.component.state };
  return props;
}

/*
props:
  value, // view value
*/
export function getFieldEvaluateValueProps(id, model) {
  const field = model.fields[id];
  const props = { value: field.component.value };
  return props;
}

/*
props:
  data, // app data - data returned from hook fromDto
  context
*/
export function getSubmitProps(model, data) {
  const props = { data, context: model.context };
  return props;
}

/*
props:
  data,
  context
*/
export function getValidateFormProps(model) {
  const props = { data: model.data, context: model.context };
  return props;
}

/*
props:
  data,
*/
export function getToDtoProps(data) {
  const props = { data };
  return props;
}

/*
props:
  data,
*/
export function getFromDtoProps(model) {
  const props = { data: model.data };
  return props;
}

/*
props:
  model,
  resources,
  metadata,
  type,
*/
export function getBeforeAfterActionHookProps(model, resources, action) {
  const props = {
 model, resources, metadata: action.metadata, type: action.type,
};
  return props;
}

/*
props:
  id,
  value,
  dependencies { id: value },
  context,
  args,
*/
export function getFieldTermsProps(id, model, args = {}, defaultArgs = {}) {
  const props = getBaseProps(id, model.fields, model.data, model.context);
  props.args = Object.assign({}, defaultArgs, args);
  return props;
}

/*
props:
  id,
  value, // data value
  dependencies { id: value }, // data value
  componentValue, // view value
  state,
  prevValue,
  prevDependencies { id: value }, // data value
  prevComponentValue, // view value
  prevState,
  context,
*/
export function getFieldComponentStateChangesProps(id, model) {
  const field = model.fields[id];
  const props = getBaseProps(id, model.fields, model.data, model.context);
  props.componentValue = field.component.value;
  props.state = field.component.state;
  props.prevValue = getPrevValue(id, model);
  props.prevDependencies = getPrevDependencies(id, model);
  props.prevComponentValue = field.component.prevValue;
  props.prevState = field.component.prevState;
  return props;
}

/*
props:
  id,
  value, // data value - from the  model.data
  dependencies { id: value },
  context,
  args,
*/
export function getFieldComponentFormatterProps(id, model, args = {}, defaultArgs = {}) {
  const props = getBaseProps(id, model.fields, model.data, model.context);
  props.args = Object.assign({}, defaultArgs, args);
  return props;
}

/*
props:
  id,
  value, // view value - filed.component.value
  dependencies { id: value },
  context,
  args,
*/
export function getFieldComponentParserProps(id, model, args = {}, defaultArgs = {}) {
  const props = getBaseProps(id, model.fields, model.data, model.context);
  props.args = Object.assign({}, defaultArgs, args);
  props.value = model.fields[id].component.value;
  return props;
}

/*
props:
  id,
  value,
  dependencies { id: value },
  prevDependencies { id: value },
  state,
  context,
  args,
*/
export function getFieldDependenciesChangeProps(id, model, args = {}, defaultArgs = {}) {
  const field = model.fields[id];
  const props = getBaseProps(id, model.fields, model.data, model.context);
  props.args = Object.assign({}, defaultArgs, args);
  props.state = (field.component || {}).state;
  props.prevDependencies = getPrevDependencies(id, model);
  return props;
}


/*
props:
  id,
  value,
*/
export function getIsEmptyProps(id, model) {
  return {
    id,
    value: get(model.data, model.fields[id].path),
  };
}

/*
props:
  id,
  value,
  label,
*/
export function getEmptyMessageProps(id, model) {
  const props = getIsEmptyProps(id, model);
  props.label = model.fields[id].label;
  return props;
}

/*
props:
  id,
  value,
  dependencies { id: value },
  context,
  args,
  context
*/
export function getFieldValidatorFuncProps(id, model, validator, defaultArgs = {}) {
  const field = model.fields[id];
  const props = getBaseProps(id, model.fields, model.data, model.context);
  const args = field.validators.find(x => x.name === validator).args || {};
  props.args = Object.assign({}, defaultArgs, args);
  return props;
}

/*
props:
  id,
  value,
  dependencies { id: { label, value } },
  args,
  label,
*/
export function getFieldValidatorMessageProps(id, model, validator, defaultArgs = {}, dynamicArgs = {}) {
  const props = getFieldValidatorFuncProps(id, model, validator, defaultArgs);
  props.label = model.fields[id].label;
  Object.assign(props.args, dynamicArgs);
  Object.keys(props.dependencies).forEach((fieldId) => {
    const field = model.fields[fieldId];
    props.dependencies[fieldId].label = field.label;
  });
  return props;
}

/*
props:
  id,
  value,
  dependencies { id: value }
  context,
*/
function getBaseProps(id, fields, data, formContext) {
  const field = fields[id];
  const value = get(data, field.path);
  const dependencies = getFieldDependencies(id, fields, data);
  const context = getFieldContext(id, fields, formContext);
  return {
    id,
    value,
    dependencies,
    context,
  };
}

function getPrevDependencies(id, model) {
  // we want to mark first time (field init) with prevDependencies undefined cuz sometimes we need this difference
  return !model.prevData ? undefined : getFieldDependencies(id, model.fields, model.prevData);
}

function getPrevValue(id, model) {
  // we want to mark first time (field init) with prevValue undefined cuz sometimes we need this difference
  return !model.prevData ? undefined : get(model.prevData, model.fields[id].path);
}

function getFieldDependencies(id, fields, data) {
  const field = fields[id];
  const dependencies = {};
  (field.dependencies || []).forEach((fieldId) => {
    const dependencyField = fields[fieldId];
    dependencies[fieldId] = { value: get(data, dependencyField.path) };
  });
  return dependencies;
}

function getFieldContext(id, fields, formContext) {
  const field = fields[id];
  const fieldContext = {};
  (field.context || []).forEach((contextId) => {
    fieldContext[contextId] = formContext[contextId];
  });
  return fieldContext;
}
