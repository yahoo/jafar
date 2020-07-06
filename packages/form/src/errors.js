/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const JAFAR_DOCS_ERROR_CODES = 'https://yahoo.github.io/jafar/docs/error-codes';

function JafarError(code, message, data, reference, subError) {
  this.code = code;
  this.message = message;
  this.data = data;
  this.reference = reference;
  if (subError) {
    this.subError = subError;
  }
}

JafarError.prototype.toString = function toString() {
  return `Jafar error - "${this.code}": ${this.message}. More info: ${this.reference}.`;
};

export function createError(prefix, error, data, args, subError) {
  const message = error.message.apply(null, args);
  const referenceHash = error.code.replace(/_/g, '-').toLowerCase();
  const reference = `${JAFAR_DOCS_ERROR_CODES}#${referenceHash}`;
  return new JafarError(error.code, `${prefix} ${message}`, data, reference, subError);
}

export function throwError(prefix, error, data, args) {
  throw createError(prefix, error, data, args);
}

export const errors = {
  MISSING_ID: {
    code: 'MISSING_ID',
    message: () => 'model.id is missing',
  },
  MISSING_DATA: {
    code: 'MISSING_DATA',
    message: () => 'model.data should be an object',
  },
  MISSING_FIELDS: {
    code: 'MISSING_FIELDS',
    message: () => 'model.fields should be an object with at least one field defined',
  },
  MISSING_FIELD_PATH: {
    code: 'MISSING_FIELD_PATH',
    message: fieldId => `field "${fieldId}" should define path`,
  },
  MISSING_COMPONENT: {
    code: 'MISSING_COMPONENT',
    message: fieldId => `field "${fieldId}" defined a component, in the model, `
    + `which do not match the definition in resources object. Example: for `
    + `model.fields.firstName.component = { name: 'Select' }, define resources.components.Select = { renderer: MyComponent }`,
  },
  INVALID_STATE_CHANGE: {
    code: 'INVALID_STATE_CHANGE',
    message: name => `component "${name}" defined a stateChange handler, which is not a function`,
  },
  REDUNDANT_CONVERSION: {
    code: 'REDUNDANT_CONVERSION',
    message: (fieldId, conversionName, name) => `field "${fieldId}" defined a ${conversionName} named "${name}" in the model `
    + `without defining a component`,
  },
  MISSING_CONVERSION: {
    code: 'MISSING_CONVERSION',
    message: (fieldId, conversionName, name) => `field "${fieldId}" defined a ${conversionName} named "${name}" in the model, `
    + `which should match a definition in resources object - resources.conversions.${name} = { func: () => {} }`,
  },
  MISSING_FORMATTER_OR_PARSER: {
    code: 'MISSING_FORMATTER_OR_PARSER',
    message: fieldId => `field "${fieldId}" defined only one of parser or formatter, `
    + 'but for editable component both formatter and parser should be defined',
  },
  MISSING_DEPENDENCIES_FIELD: {
    code: 'MISSING_DEPENDENCIES_FIELD',
    message: (fieldId, dependOnField) => `field "${fieldId}" defined a dependency on field "${dependOnField}" in dependencies, `
    + `but ${dependOnField} is not defined in model.fields`,
  },
  MISSING_DEPENDENCIES_CHANGE: {
    code: 'MISSING_DEPENDENCIES_CHANGE',
    message: (fieldId, name) => `field "${fieldId}" defined a dependenciesChange, named "${name}" in the model, `
    + `which should match a definition in resources object - resources.dependenciesChanges.${name} = { func: () => {} }`,
  },
  MISSING_VALIDATOR: {
    code: 'MISSING_VALIDATOR',
    message: (fieldId, name) => `field "${fieldId}" defined a validator, named "${name}" in the model, `
    + `which should match a definition in resources object - resources.validators.${name} = { func, message }`,
  },
  MISSING_TERM: {
    code: 'MISSING_TERM',
    message: (fieldId, termsType, name) => `field "${fieldId}" defined a term in ${termsType}, named "${name}" in the model, `
    + `which should match a definition in resources object - resources.${termsType}.${name} = { func: () => {} }`,
  },
  MISSING_HOOKS: {
    code: 'MISSING_HOOKS',
    message: () => 'resources.hooks should be an object',
  },
  INVALID_HOOK: {
    code: 'INVALID_HOOK',
    message: (hookName, supportedHooks) => `hook "${hookName}" is not supported. `
      + `Supported hooks: ${supportedHooks.join(', ')}`,
  },
  INVALID_SETTING: {
    code: 'INVALID_SETTING',
    message: (settingName, expected) => `setting "${settingName}" is invalid. Expected to be ${expected}`,
  },
  INVALID_SUBMIT: {
    code: 'INVALID_SUBMIT',
    message: () => 'can\'t perform submit when form is invalid',
  },
  CIRCULAR_DEPENDENCIES: {
    code: 'CIRCULAR_DEPENDENCIES',
    message: (fieldId, formId, dependenciesStr) => `field "${fieldId}" of form "${formId}" defined circular dependencies: `
    + `${dependenciesStr}`,
  },
  MAX_CIRCULAR_DEPENDENCIES_LOOPS: {
    code: 'MAX_CIRCULAR_DEPENDENCIES_LOOPS',
    message: (fieldId, formId, maxChangeValueLoops, dependenciesStr) => `field "${fieldId}" of form "${formId}" has `
    + `reached maximum circular dependencies loops (${maxChangeValueLoops}): ${dependenciesStr}`,
  },
  CHANGE_VALUE_UPDATER_NOT_SUPPORTED: {
    code: 'CHANGE_VALUE_UPDATER_NOT_SUPPORTED',
    message: () => `calling changeValue action with an updater function is not supported for a field without a component`,
  },
  INVALID_LOG_LEVEL: {
    code: 'INVALID_LOG_LEVEL',
    message: logLevel => `log level "${logLevel}" is not supported. `
      + `Supported log levels are: "debug" / "warn" / "error" / "none"`,
  }, 
  ACTION_FAILED: {
    code: 'ACTION_FAILED',
    message: type => `action "${type}" failed`,
  },
};
