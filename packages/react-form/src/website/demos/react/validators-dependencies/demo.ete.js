/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, clearInputValue, typeInput, testSaveChangesData, verifyError, verifyNoError,
} from '../../../e2e.utils';

export default async function (page) {
  const errorMessage = 'Subject should be included in description';
  const requiredMessage = 'Field required';
  await waitForAsyncToRender(page);

  // Field with id "subject" - changes value - causes data viewer data to change
  const idSubject = 'subject';
  let initialValue = '';
  let leafPath = 'subject';
  await testInput(page, idSubject, leafPath, initialValue);

  // Field with id "description" - changes value - causes data viewer data to change
  const idDescription = 'description';
  initialValue = '';
  leafPath = 'description';
  await testInput(page, idDescription, leafPath, initialValue);

  // clear inputs and make sure no error messages
  await clearInputValue(page, idSubject);
  await clearInputValue(page, idDescription);
  await waitForAsyncToRender(page);
  await verifyNoError(page, idSubject, errorMessage);
  await verifyNoError(page, idDescription, errorMessage);
  await verifyNoError(page, idSubject, requiredMessage);
  await verifyNoError(page, idDescription, requiredMessage);

  // type in subject "a" and expect error
  await typeInput(page, idSubject, 'a');
  await waitForAsyncToRender(page);
  // verify error messages
  await verifyError(page, idSubject, errorMessage);
  await verifyError(page, idDescription, requiredMessage);
  // verify save disable (after click the data Viewer is not changed)
  let newData = { [idSubject]: 'a' };
  await testSaveChangesData(page, newData, 1);

  // type in description "b" and expect error
  await typeInput(page, idDescription, 'b');
  await waitForAsyncToRender(page);
  // verify error messages
  await verifyError(page, idSubject, errorMessage);
  await verifyError(page, idDescription, errorMessage);
  // verify save disable (after click the data Viewer is not changed)
  newData = { [idSubject]: 'a', [idDescription]: 'b' };
  await testSaveChangesData(page, newData, 2);

  // type in description "a"
  await typeInput(page, idDescription, 'a');
  await waitForAsyncToRender(page);
  // verify no error
  await verifyNoError(page, idSubject, errorMessage);
  await verifyNoError(page, idDescription, errorMessage);

  // Save click - call changeData with correct data
  newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
