/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testText, testInput, testCheckboxCollection, testResetForm,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "id" - readonly
  let id = 'id';
  let initialValue = '123456';
  let leafPath = 'id';
  await testText(page, id, leafPath, initialValue);

  // Field with id "name" - changes value - causes data viewer data to change
  id = 'name';
  initialValue = 'Rachel Green';
  leafPath = 'name';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "hobbies" - changes value - causes data viewer data to change
  id = 'hobbies';
  initialValue = ['FASHION', 'SHOP'];
  const values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  const addValue = 'COOK';
  await testCheckboxCollection(page, id, initialValue, values, addValue);

  // Reset
  const dataViewerData = {
    id: '123456',
    name: 'Rachel Green',
    0: 'FASHION',
    1: 'SHOP',
  };
  await testResetForm(page, dataViewerData, 4);
}
