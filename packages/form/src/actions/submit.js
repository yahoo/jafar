/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { isEmpty } from 'lodash';
import { addPendingAction } from '../pending-actions';
import { createError, errors as errorCodes } from '../errors';
import { getFormErrors } from '../utils';
import { getSubmitProps, getFromDtoProps, getValidateFormProps } from '../handlers-props';
import { Actions } from './types';
import { setFieldsErrors, setFormErrors } from './creator';

const ERROR_PREFIX = 'Form submit -';

export default function submit(formId) {
  return (dispatch, getState) => new Promise((resolve) => {
    // add the func action to the form pendingActions queue
    const action = createPendingAction(formId, resolve);

    addPendingAction(formId, action)(getState, dispatch);
  });
}

export const createPendingAction = (formId, resolve) => ({
  type: Actions.SUBMIT,
  metadata: { formId },
  func: executeAction,
  args: [formId],
  resolve,
});

const filterErrors = (model, fieldsErrors) => {
  if (!fieldsErrors || isEmpty(fieldsErrors)) {
    return undefined;
  }

  const errors = {};
  // filter out unknown field ids, excluded fields and empty errors
  Object.keys(fieldsErrors).filter(fieldId => model.fields[fieldId]
      && !model.fields[fieldId].excluded
      && !isEmpty(fieldsErrors[fieldId]))
    .forEach((fieldId) => {
      errors[fieldId] = fieldsErrors[fieldId];
    });

  return isEmpty(errors) ? undefined : errors;
};

const executeAction = formId => async (dispatch, getState) => {
  const { model, resources } = getState().forms[formId];

  // if form invalid - throw
  if (model.invalid) {
    throw createError(ERROR_PREFIX, errorCodes.INVALID_SUBMIT, { model }, []);
  }
  // run form validate
  let props = getValidateFormProps(model);
  const result = await resources.hooks.validate(props);
  const errors = filterErrors(model, result);

  // if errors - update model and return
  if (errors) {
    // update fields - errors and invalid
    dispatch(setFieldsErrors(formId, errors));

    const { model } = getState().forms[formId];

    // update form - errors and invalid
    // note - setFieldsErrors and setFormErrors are splitted to different Dispatches since
    // setFormErrors is a result of fields errors after calculation that is not correct to perform
    // in the reducer. getFormErrors for example filter excluded fields from calculation.
    const formErrors = getFormErrors(model);
    dispatch(setFormErrors(formId, formErrors));
    return;
  }

  // run fromDto hook and set result to the store
  props = getFromDtoProps(model);
  const data = await resources.hooks.fromDto(props);

  // run submit
  props = getSubmitProps(model, data);
  await resources.hooks.submit(props);

  // return success
  return true;
};
