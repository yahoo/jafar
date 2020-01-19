/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testSaveChangesData, verifyError, verifyNoError,
} from '../../../e2e.utils';

const requiredMessage = 'Field required';
const idFirstName = 'firstName';
const isLastName = 'lastName';

export default async function (page) {

  await waitForAsyncToRender(page);

  // verify fields with required errors
  await verifyError(page, idFirstName, requiredMessage);
  await verifyError(page, isLastName, requiredMessage);

  // verify submit is disabled - the form is not dirty yet
  let saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // Field with id "firstName" - changes value - causes data viewer data to change
  let initialValue = '';
  let leafPath = idFirstName;
  await testInput(page, idFirstName, leafPath, initialValue, 'Monica');

  // verify required error not exists
  await verifyNoError(page, idFirstName, requiredMessage);

  // Field with id "lastName" - changes value - causes data viewer data to change
  const idDescription = isLastName;
  initialValue = '';
  leafPath = isLastName;
  await testInput(page, idDescription, leafPath, initialValue, 'Geller');

  // verify required error not exists
  await verifyNoError(page, isLastName, requiredMessage);
  
  // verify submit is not disabled now - the form is dirty
  saveButton = await page.$('button[aria-label="Save"]:not([disabled])');
  expect(saveButton).toBeTruthy();

  // submit click - perform submit and clear the form's data
  const newData = {};
  await testSaveChangesData(page, newData, 0);

  // verify empty form again with required errors
  await verifyError(page, idFirstName, requiredMessage);
  await verifyError(page, isLastName, requiredMessage);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
