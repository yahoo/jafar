/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, isDataViewerContains, testSaveChangesData, CORE_CYCLE_TIME,
} from '../../../e2e.utils';

export default async function (page) {
  await waitForAsyncToRender(page);
  // make sure field with id welcomeMessage has the correct value.
  let id = 'welcomeMessage';
  let newValue = 'Hello stranger, welcome!';
  let leafPath = 'welcomeMessage';
  let exists = await isDataViewerContains(page, leafPath, newValue);
  expect(exists).toBeTruthy();

  // Field with id "name" - changes value - causes data viewer data to change
  id = 'name';
  const initialValue = '';
  leafPath = 'name';
  newValue = 'Ross';
  await testInput(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // make sure field with id welcomeMessage has the correct value.
  id = 'welcomeMessage';
  newValue = 'Hello ross, welcome!';
  leafPath = 'welcomeMessage';
  exists = await isDataViewerContains(page, leafPath, newValue);
  expect(exists).toBeTruthy();

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 1);

  // make sure field with id welcomeMessage has the correct value
  id = 'welcomeMessage';
  newValue = 'Hello stranger, welcome!';
  leafPath = 'welcomeMessage';
  exists = await isDataViewerContains(page, leafPath, newValue);
  expect(exists).toBeTruthy();
}

async function waitForAsyncToRender(page) {
  await page.waitFor(CORE_CYCLE_TIME);
}
