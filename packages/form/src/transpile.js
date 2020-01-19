/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
 cloneDeep, isString, isFunction,
} from 'lodash';

const indexes = {
  component: 0,
  formatter: 0,
  parser: 0,
  dependenciesChange: 0,
  validator: 0,
  excludeTerm: 0,
  disableTerm: 0,
  requireTerm: 0,
};

const isModelComponentDef = c => c && c.name;
const isResourceComponentDef = c => c && c.renderer;
const isActualComponentInModel = c => c && (isFunction(c) || !isModelComponentDef(c));
const isActualComponentInResources = c => !isResourceComponentDef(c);

export default function transpileForm({ model = {}, resources = {} }) {
  const form = { model: cloneDeep(model), resources: cloneDeep(resources) };

  // transpile fields
  Object.values(form.model.fields || {}).forEach((f) => {
    const field = f || {};
    transpileFieldOption('component', 'components', field, form.resources, 'renderer', isActualComponentInModel);
    transpileFieldOption('formatter', 'conversions', field, form.resources);
    transpileFieldOption('parser', 'conversions', field, form.resources);
    transpileFieldOption('dependenciesChange', 'dependenciesChanges', field, form.resources);
    transpileFieldValidators(field, form.resources);
    transpileFieldTerm('excludeTerm', field, form.resources);
    transpileFieldTerm('disableTerm', field, form.resources);
    transpileFieldTerm('requireTerm', field, form.resources);
  });

  // transpile resources
  transpileResourcesOptions(form.resources, 'components', 'renderer', isActualComponentInResources);
  transpileResourcesOptions(form.resources, 'conversions');
  transpileResourcesOptions(form.resources, 'dependenciesChanges');
  transpileResourcesOptions(form.resources, 'validators');
  transpileResourcesOptions(form.resources, 'terms');

  return form;
}

function transpileFieldOption(option, resourceOption, field, resources, funcName = 'func', isResource = isFunction) {
  if (isString(field[option])) {
    field[option] = { name: field[option] };
  } else if (isResource(field[option])) {
    indexes[option] += 1;
    const name = `${option}${indexes[option]}`;
    const func = field[option];
    field[option] = { name };
    resources[resourceOption] = resources[resourceOption] || {};
    resources[resourceOption][name] = { [funcName]: func };
  }
}

function transpileResourcesOptions(resources, resourceOption, mainName = 'func', isResource = isFunction) {
  Object.keys(resources[resourceOption] || {}).forEach((name) => {
    if (isResource(resources[resourceOption][name])) {
      resources[resourceOption][name] = { [mainName]: resources[resourceOption][name] };
    }
  });
}

function transpileFieldValidators(field, resources) {
  (field.validators || []).forEach((validator, index) => {
    if (isString(validator)) {
      field.validators[index] = { name: validator };
    } else if (isFunction(validator)) {
      indexes.validator += 1;
      const name = `validator${indexes.validator}`;
      const func = validator;
      field.validators[index] = { name };
      resources.validators = resources.validators || {};
      resources.validators[name] = { func };
    }
  });
}

function transpileFieldTerm(termName, field, resources) {
  const terms = (field[termName] || {}).terms || [];
  terms.forEach((t, i) => transpileFieldTerms(terms, t, i, termName, resources));
  transpileFieldOption(termName, 'terms', field, resources);
}

function transpileFieldTerms(terms = [], term, index, termName, resources) {
  terms.forEach((t, i) => transpileFieldTerm(terms, t, i));

  if (isString(term)) {
    terms[index] = { name: term };
  } else if (isFunction(term)) {
    indexes[termName] += 1;
    const name = `${termName}${indexes[termName]}`;
    const func = term;
    terms[index] = { name };
    resources.terms = resources.terms || {};
    resources.terms[name] = { func };
  }
}
