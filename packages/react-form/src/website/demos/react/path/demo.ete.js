/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testCheckboxCollection, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "email" - changes value - causes data viewer data to change
  let id = 'email';
  let initialValue = 'rachel.green@friends.com';
  let leafPath = 'email';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "addressHome" - changes value - causes data viewer data to change
  id = 'addressHome';
  initialValue = '90 Bedford Street, NYC';
  leafPath = 'home';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "hobbies" - changes value - causes data viewer data to change
  id = 'hobbies';
  initialValue = ['FASHION', 'SHOP'];
  const values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  const addValue = 'COOK';
  await testCheckboxCollection(page, id, initialValue, values, addValue);

  // Field with id "hobbiesOne" - changes value - causes data viewer data to change
  id = 'hobbiesOne';
  initialValue = 'SHOP';
  leafPath = '1';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "friendsZeroFirstName" - changes value - causes data viewer data to change
  id = 'friendsZeroFirstName';
  initialValue = 'Ross';
  leafPath = 'firstName';
  await testInput(page, id, leafPath, initialValue);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}
