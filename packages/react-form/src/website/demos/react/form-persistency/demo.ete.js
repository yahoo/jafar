/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import {
  CORE_CYCLE_TIME, getFieldComponentText, getInput, verifyCheckboxesComponentRendered, verifyDataViewerData, typeInput,
} from '../../../e2e.utils';

export default async function (page, demoId) {
  // wait for core cycle
  await page.waitFor(CORE_CYCLE_TIME);

  // clear local storage
  const localStorageKey = 'user-form';
  localStorage.removeItem(localStorageKey);

  // verify page data
  const initialData = {
    id: '123456',
    name: 'Rachel Green',
    hobbiesChecked: ['FASHION', 'SHOP'],
    hobbiesFiltered: ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'],
    hobbiesSearchValue: '',
    data: {
      id: '123456',
      name: 'Rachel Green',
      0: 'FASHION',
      1: 'SHOP',
    },
  };
  const pageData = cloneDeep(initialData);
  await verifyPageData(page, pageData);

  // change name
  await typeInput(page, 'name', '2');

  // change hobbies add cook
  const cookCheckbox = await getInput(page, 'hobbies', 'COOK');
  await cookCheckbox.click();

  // change hobbies search filter
  await typeInput(page, 'hobbies', 's');

  // wait for core cycle
  await page.waitFor(CORE_CYCLE_TIME);

  // verify page data
  pageData.name += '2';
  pageData.data.name += '2';
  pageData.data[2] = 'COOK';
  pageData.hobbiesSearchValue += 's';
  pageData.hobbiesChecked.push('COOK');
  pageData.hobbiesFiltered = ['BASKETBALL', 'SHOP', 'FASHION'];
  await verifyPageData(page, pageData);

  // refresh tab
  await page.reload();

  // wait for example to appear
  const htmlTabContainer = await page.$('#example-html');
  expect(htmlTabContainer).toBeTruthy();

  // wait for core cycle
  await page.waitFor(CORE_CYCLE_TIME);

  // verify page data
  await verifyPageData(page, pageData);

  // verify save is NOT disabled (cuz its dirty from the prev form)
  const saveButton = await page.$('button[aria-label="Save"]:not([disabled])');
  expect(saveButton).toBeTruthy();

  // click reset
  await page.click('button[aria-label="Reset"]');
  await page.waitFor(CORE_CYCLE_TIME);

  // verify page data - that this is the initial state
  await verifyPageData(page, initialData);
}

async function verifyPageData(page, pageData) {
  // verify field 'id'
  const text = await getFieldComponentText(page, 'id');
  expect(text).toEqual(pageData.id);

  // verify field 'name'
  const input = await getInput(page, 'name', pageData.name);
  expect(input).toBeTruthy();

  // verify field 'hobbies'
  await verifyCheckboxesComponentRendered(page, 'hobbies', pageData.hobbiesChecked, pageData.hobbiesFiltered);

  // verify field 'hobbies' search value
  const inputSearch = await getInput(page, 'hobbies', pageData.hobbiesSearchValue);
  expect(inputSearch).toBeTruthy();

  // verify data viewer
  await verifyDataViewerData(page, pageData.data, Object.keys(pageData.data).length);
}
