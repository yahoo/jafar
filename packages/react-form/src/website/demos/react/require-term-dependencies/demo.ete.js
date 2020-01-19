/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  verifyError, verifyNoError, testSaveChangesData, testInput,
} from '../../../e2e.utils';

export default async function (page) {
  const idDescription = 'description';
  const idShortDescription = 'shortDescription';
  const errorMessage = 'Field required';

  // wait for async require term to finish evaluate.
  await waitForAsyncToRender(page);

  // verify field is not required
  await verifyNoError(page, idShortDescription, errorMessage);

  // verify submit is disabled
  let saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // enter value to description
  let initialValue = '';
  let leafPath = idDescription;
  await testInput(page, idDescription, leafPath, initialValue, 'abc');

  // verify submit is disabled
  saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // verify field shortDescription is required
  await verifyError(page, idShortDescription, errorMessage);

  // enter value to shortDescription
  initialValue = '';
  leafPath = idShortDescription;
  await testInput(page, idShortDescription, leafPath, initialValue, 'ab');

  // verify submit not disabled
  saveButton = await page.$('button[aria-label="Save"]:not([disabled])');
  expect(saveButton).toBeTruthy();

  // submit click - perform submit and clear the form's data
  const newData = {};
  await testSaveChangesData(page, newData, 0);

  // verify empty form again with no required errors
  await verifyNoError(page, idShortDescription, errorMessage);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
