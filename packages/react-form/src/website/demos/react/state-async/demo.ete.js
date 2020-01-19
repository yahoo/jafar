/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testCheckboxCollection, testResetForm, verifyCheckBoxCollectionValuesMatch,
} from '../../../e2e.utils';

export default async function (page) {
  await waitForAsyncCheckboxesToRender(page);

  // Field with id "hobbies" - changes value - causes data viewer data to change
  // check initial checkboxes view is ok, and toggle check an item.
  const fieldId = 'hobbies';
  const values = ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'];
  let initialValue = ['FASHION', 'SHOP'];
  let addValue = 'COOK';
  await testCheckboxCollection(page, fieldId, initialValue, values, addValue);

  // Field with id "hobbies" - changes value - causes data viewer data to change
  // add letter to the search input
  await waitForAsyncCheckboxesToRender(page);
  const input = await page.$('input[type="search"]');
  await input.focus();
  page.keyboard.type('s');
  await waitForAsyncCheckboxesToRender(page);
  // make sure the items are filtered
  const filteredValues = ['BASKETBALL', 'SHOP', 'FASHION'];
  initialValue = ['FASHION', 'SHOP'];
  addValue = 'BASKETBALL';
  await testCheckboxCollection(page, fieldId, initialValue, filteredValues, addValue);

  // Save click - reset the form
  // click save and check that dataViewer was updated
  const newData = {
    0: 'FASHION',
    1: 'SHOP',
  };
  await testResetForm(page, newData, 2);
  // wait for the checkboxes to render and check that now no item is selected
  await waitForAsyncCheckboxesToRender(page);
  initialValue = [];
  await verifyCheckBoxCollectionValuesMatch(page, fieldId, initialValue, values);
}

async function waitForAsyncCheckboxesToRender(page) {
  await page.waitFor(700);
}
