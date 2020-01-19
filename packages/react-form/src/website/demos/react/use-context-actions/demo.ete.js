/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import {
  getFieldComponentText, getInput, verifyCheckboxesComponentRendered, verifyDataViewerData,
  CORE_CYCLE_TIME, getFieldComponent,
} from '../../../e2e.utils';

export default async function (page) {
  await page.waitFor(CORE_CYCLE_TIME);

  const initialData = {
    id: '123456',
    name: 'Rachel',
    hobbiesChecked: ['FASHION', 'SHOP'],
    hobbiesFiltered: ['BASKETBALL', 'FOOTBALL', 'SHOP', 'FASHION', 'COOK'],
    hobbiesSearchValue: '',
    data: {
      id: '123456',
      name: 'Rachel',
      0: 'FASHION',
      1: 'SHOP',
    },
  };

  const pageData = cloneDeep(initialData);

  // verify page data
  await verifyPageData(page, pageData);
  await verifyDuration(page, 'init', 250);

  // click button "change field value" & verify data
  await page.click('[action="changeValue"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  pageData.name = 'Ross';
  pageData.data.name = 'Ross';
  await verifyPageData(page, pageData);
  await verifyDuration(page, 'changeValue', 300);

  // click button "change field state" & verify data
  await page.click('[action="changeState"] button');
  await page.waitFor(CORE_CYCLE_TIME + 200);
  pageData.hobbiesChecked = [];
  pageData.hobbiesFiltered = ['BASKETBALL', 'FOOTBALL'];
  pageData.hobbiesSearchValue = 'ball';
  await verifyPageData(page, pageData);
  await verifyDuration(page, 'changeState', 350);

  // click button "change field component" & verify data
  await page.click('[action="changeUi"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  pageData.nameIsLabel = true;
  await verifyPageData(page, pageData);
  await verifyDuration(page, 'changeUi', 50);

  // click button "change data" & verify data
  await page.click('[action="changeData"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  pageData.id = '7777777';
  pageData.name = 'Monica';
  pageData.hobbiesChecked = ['COOK'];
  pageData.data = {
    id: pageData.id,
    name: pageData.name,
    0: pageData.hobbiesChecked[0],
  };
  await verifyPageData(page, pageData);
  await verifyDuration(page, 'changeData', 80);

  // click button "change context" & verify data & include again field
  let fieldId = await getFieldComponent(page, 'id');
  expect(fieldId).toBeTruthy();
  await page.click('[action="changeContext"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  fieldId = await getFieldComponent(page, 'id');
  expect(fieldId).toBeFalsy();
  await page.click('[action="changeContext"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  fieldId = await getFieldComponent(page, 'id');
  expect(fieldId).toBeTruthy();

  // click button - "submit" & verify
  const messages = [];
  page.on('console', msg => {
    messages.push(msg.text());
  });
  await page.click('[action="submit"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  await verifyPageData(page, pageData);
  expect(messages.filter(x => x.includes('submit')).length).toEqual(2);

  // click button "reset" & verify data
  await page.click('[action="reset"] button');
  await page.waitFor(CORE_CYCLE_TIME);
  await verifyPageData(page, initialData);
  await verifyDuration(page, 'reset', 160);
}

async function verifyPageData(page, pageData) {
  // verify field 'id'
  let text = await getFieldComponentText(page, 'id');
  expect(text).toEqual(pageData.id);

  // verify field 'name'
  if (pageData.nameIsLabel) {
    text = await getFieldComponentText(page, 'name');
    expect(text).toEqual(pageData.name);
  } else {
    const input = await getInput(page, 'name', pageData.name);
    expect(input).toBeTruthy();
  }

  // verify field 'hobbies'
  await verifyCheckboxesComponentRendered(page, 'hobbies', pageData.hobbiesChecked, pageData.hobbiesFiltered);

  // verify field 'hobbies' search value
  const input = await getInput(page, 'hobbies', pageData.hobbiesSearchValue);
  expect(input).toBeTruthy();

  // verify data viewer
  await verifyDataViewerData(page, pageData.data, Object.keys(pageData.data).length);
}

async function verifyDuration(page, action, maxDuration) {
  const time = await page.$(`[action="${action}"] [duration="true]`);
  expect(Number(time) <= maxDuration);
}
