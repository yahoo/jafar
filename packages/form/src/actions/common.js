/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isFormInvalid,
  isFormDirty,
  getFormErrors,
} from '../utils';
import {
  setFormEvaluation,
} from './creator';

// global internal data - to help deal with debounce
// each time formId / fieldId changed in an action - do debounce flush
const internalFormData = {
  lastUpdatedFieldValue: undefined,
  lastUpdatedFieldState: undefined,
};

export function handleDebounceFlush(formId, fieldId, debounceKey, debounceFunc) {
  const key = `${formId};${fieldId}`;
  if (internalFormData[debounceKey] !== key) {
    debounceFunc.flush();
  }
  internalFormData[debounceKey] = key;
}

const cacheDebounceResolves = {};

export const addCachedDebounceResolve = (formId, fieldId, extra, resolve) => {
  const key = `${formId};${fieldId}${extra}`;
  cacheDebounceResolves[key] = cacheDebounceResolves[key] || [];
  cacheDebounceResolves[key].push(resolve);
};

export const removeCachedDebounceResolve = (formId, fieldId, extra) => {
  const key = `${formId};${fieldId}${extra}`;
  const debounceResolves = cacheDebounceResolves[key];
  // remove last resolve - since it being resolve in the action process separately
  if (debounceResolves.length) {
    debounceResolves.splice(debounceResolves.length - 1, 1);
  }
  delete cacheDebounceResolves[key];
  return debounceResolves;
};

export function setFormEvaluationResult(formId, getState, dispatch) {
  const { model } = getState().forms[formId];
  const invalid = isFormInvalid(model);
  const dirty = isFormDirty(model);
  const errors = getFormErrors(model);
  dispatch(setFormEvaluation(formId, invalid, dirty, errors));
}
