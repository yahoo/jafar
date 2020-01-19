/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, clearInputValue, getFieldText, typeInput, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "name" - changes value - causes data viewer data to change.
  const id = 'name';
  const initialValue = '';
  const leafPath = 'name';
  const addValue = 'ross';
  await testInput(page, id, leafPath, initialValue, addValue);
  await waitForAsyncToRender(page);
  let text = await getFieldText(page, id);
  expect(text).not.toContain('Name should be unique');

  // Field with id "name" - changes value to existing unique name - causes data viewer data to change
  await clearInputValue(page, id);
  await testInput(page, id, leafPath, initialValue, 'monica');
  await waitForAsyncToRender(page);
  // verify error message
  text = await getFieldText(page, id);
  expect(text).toContain('Name should be unique');
  // verify save disable (after click the data Viewer is not changed)
  let newData = { name: 'monica' };
  await testSaveChangesData(page, newData, 1);

  // change the name to non-unique name
  await typeInput(page, id, '2');
  await waitForAsyncToRender(page);

  // Save click - call changeData with correct data
  newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
