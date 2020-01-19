/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "age" - changes value - causes data viewer data to change
  const id = 'age';
  const initialValue = '18';
  const leafPath = 'age';
  await testInput(page, id, leafPath, initialValue, '3', true);

  // // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}
