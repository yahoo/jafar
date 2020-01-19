/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, getInput, testCheckboxCollection, verifyCheckBoxCollectionValuesMatch,
  testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  await waitForAsyncToRender(page);
  // Field with id "hobbies" - changes value - causes data viewer data to change
  // check initial checkboxes view is ok, and toggle check an item.
  const fieldId = 'hobbies';
  const values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  let initialValue = [];
  const addValue = 'SHOP';
  await testCheckboxCollection(page, fieldId, initialValue, values, addValue);

  // Field with id "hobbies" - changes value - causes data viewer data to change
  // add letter to the search input
  let input = await page.$('input[type="search"]');
  await input.focus();
  page.keyboard.type('s');
  // make sure the items are filtered
  const filteredValues = ['BASKETBALL', 'SHOP', 'FASHION'];
  await verifyCheckBoxCollectionValuesMatch(page, fieldId, initialValue, filteredValues);

  // Field with id "name" - changes value - causes data viewer data to change
  const id = 'name';
  initialValue = '';
  const leafPath = 'name';
  const newValue = 'r';
  await testInput(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // make sure checkboxes items and search are cleared
  initialValue = [];
  await verifyCheckBoxCollectionValuesMatch(page, fieldId, initialValue, values);
  input = await page.$('input[type="search"]');
  let inputValue = await page.evaluate(input => input.value, input);
  expect(inputValue).toEqual('');

  // Field with id "hobbies" - changes value - causes data viewer data to change
  // check initial checkboxes view is ok, and toggle check an item.
  input = await getInput(page, fieldId, addValue);
  await input.click();

  // Field with id "hobbies" - changes value - causes data viewer data to change
  // add letter to the search input
  input = await page.$('input[type="search"]');
  await input.focus();
  page.keyboard.type('s');
  await waitForAsyncToRender(page);
  // make sure the items are filtered
  initialValue = [addValue];
  await verifyCheckBoxCollectionValuesMatch(page, fieldId, initialValue, filteredValues);

  // Save click - init the form with empty data
  // click save and check that dataViewer was updated
  const newData = {};
  await testSaveChangesData(page, newData, 0);
  // wait for the checkboxes to render and check that now no item is selected
  await waitForAsyncToRender(page);

  // make sure checkboxes items and search are cleared.
  initialValue = [];
  await verifyCheckBoxCollectionValuesMatch(page, fieldId, initialValue, values);
  input = await page.$('input[type="search"]');
  inputValue = await page.evaluate(input => input.value, input);
  expect(inputValue).toEqual('');
}

async function waitForAsyncToRender(page) {
  await page.waitFor(600);
}
