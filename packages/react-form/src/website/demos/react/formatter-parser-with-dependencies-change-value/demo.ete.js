/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  CORE_CYCLE_TIME, getDataViewerRowsSelector, testSaveChangesData, isDataViewerContains, getFieldSelector,
} from '../../../e2e.utils';

export default async function (page) {
  // verify that data viewer is empty from data
  let rows = await page.$$(getDataViewerRowsSelector());
  expect(rows).toHaveLength(2);

  // change country to israel
  let id = 'country';
  let leafPath = 'country';
  let initialValue = 'MEX';
  let initialText = 'Mexico';
  let newValue = 'Israel';
  let newText = 'Israel';
  let newValueDataViewer = 'IL';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText, newValueDataViewer);
  await page.waitFor(CORE_CYCLE_TIME);

  // verify data viewer contains israel and jerusalem
  rows = await page.$$(getDataViewerRowsSelector());
  expect(rows).toHaveLength(2);
  initialValue = 'IL';
  let exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
  leafPath = 'city';
  initialValue = 'JRM';
  exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();

  // change city
  id = 'city';
  leafPath = 'city';
  initialValue = 'JRM';
  initialText = 'Jerusalem';
  newValue = 'Tel Aviv';
  newText = 'Tel Aviv';
  newValueDataViewer = 'TLV';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText, newValueDataViewer);

  // make sure data viewer contain country and city with correct data values
  rows = await page.$$(getDataViewerRowsSelector());
  expect(rows).toHaveLength(2);
  leafPath = 'country';
  initialValue = 'IL';
  exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
  leafPath = 'city';
  initialValue = 'TLV';
  exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();

  // unselect country
  id = 'country';
  const dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  await dropdownButton.click();
  const newValueItem = await page.$(`li[data-value]:first-child`);
  await newValueItem.click();
  await page.waitFor(CORE_CYCLE_TIME + CORE_CYCLE_TIME);

  // make sure data viewer contain country and city does not appear
  rows = await page.$$(getDataViewerRowsSelector());
  expect(rows).toHaveLength(0);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function testDropdown(page, id, leafPath, initialValueInDataViewer, initialText, newValue, newText, newValueDataViewer) {
  // find input and make sure it was loaded with the initialValue
  let dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  let text = await page.evaluate(el => el.innerText, dropdownButton);
  expect(text).toEqual(initialText);
  // find the data viewer and make sure it loaded with the initialValue
  let exists = await isDataViewerContains(page, leafPath, initialValueInDataViewer);
  expect(exists).toBeTruthy();
  // change selected value
  await dropdownButton.click();
  const newValueItem = await page.$(`li[data-value='"${newValue}"']`);
  await newValueItem.click();
  await page.waitFor(CORE_CYCLE_TIME);
  // make sure the dropdown selected has changed
  dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  text = await page.evaluate(el => el.innerText, dropdownButton);
  expect(text).toEqual(newText);
  // make sure the data viewer has changed
  exists = await isDataViewerContains(page, leafPath, newValueDataViewer);
  expect(exists).toBeTruthy();
}
