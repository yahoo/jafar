/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "name" - changes value - causes data viewer data to change
  let id = 'name';
  let initialValue = '';
  let leafPath = 'name';
  const newValue = 'ross';
  await testInput(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // make sure field with id lastName has name value.toUppercase()
  id = 'lastName';
  initialValue = 'ROSS';
  leafPath = 'lastName';
  await testInput(page, id, leafPath, initialValue);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
