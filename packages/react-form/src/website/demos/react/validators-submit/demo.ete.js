/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testSaveChangesData, verifyError, verifyNoError,
} from '../../../e2e.utils';

const errorMessage = 'Email already taken';
const requiredMessage = 'Field required';
const idEmail = 'email';
const idPassword = 'password';

export default async function (page) {

  await waitForAsyncToRender(page);

  // verify fields with required errors
  await verifyError(page, idEmail, requiredMessage);
  await verifyError(page, idPassword, requiredMessage);

  // verify submit is disabled - the form is not dirty yet
  let saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // Field with id "email" - changes value - causes data viewer data to change
  // type invalid email
  let initialValue = '';
  let leafPath = idEmail;
  await testInput(page, idEmail, leafPath, initialValue, 'ross@friends.com');

  // verify required error not exists
  await verifyNoError(page, idEmail, requiredMessage);

  // Field with id "password" - changes value - causes data viewer data to change
  const idDescription = idPassword;
  initialValue = '';
  leafPath = idPassword;
  await testInput(page, idDescription, leafPath, initialValue, '1234');

  // verify required error not exists
  await verifyNoError(page, idPassword, requiredMessage);
  
  // verify submit is not disabled now - the form is dirty
  saveButton = await page.$('button[aria-label="Save"]:not([disabled])');
  expect(saveButton).toBeTruthy();

  // click submit and verify form level error
  await submitAndVerifyError(page, saveButton);

  // change email to another unique value
  leafPath = idEmail;
  await testInput(page, idEmail, leafPath, initialValue, 'monica@friends.com', false, true);

  // click submit and verify form level error
  await submitAndVerifyError(page, saveButton);

  // change email to non unique value
  await testInput(page, idEmail, leafPath, initialValue, 'rachel@friends.com', false, true);

  // submit click - perform submit and clear the form's data
  const newData = {};
  await testSaveChangesData(page, newData, 0);

  // verify empty form again with required errors
  await verifyError(page, idEmail, requiredMessage);
  await verifyError(page, idPassword, requiredMessage);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}

async function submitAndVerifyError(page, saveButton) {
  // click submit
  await saveButton.click();
  await waitForAsyncToRender(page);

  // verify form level error
  await verifyError(page, idEmail, errorMessage);
  await verifyNoError(page, idPassword, errorMessage);
  await verifyNoError(page, idPassword, requiredMessage);

  /// verify submit is not disabled now - the form is invalid
  saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();
}
