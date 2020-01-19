/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, getInput, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async exclude term to finish evaluate.
  await waitForAsyncToRender(page);

  // make sure use admin loaded
  await verifyUser(page, 'ADMIN');

  // Field with id "resetPassword" - changes value - causes data viewer data to change
  const id = 'resetPassword';
  const initialValue = '';
  const leafPath = 'resetPassword';
  await testInput(page, id, leafPath, initialValue);
  await waitForAsyncToRender(page);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);

  // click on switch user button
  const button = await page.$('.switch-user');
  await button.click();

  // wait for async exclude term to finish evaluate
  await waitForAsyncToRender(page);

  // make sure use normal user loaded
  await verifyUser(page, 'NORMAL');

  // make sure field "resetPassword" is excluded - not appear on the page
  const input = await getInput(page, id);
  expect(input).toBeFalsy();
}

async function verifyUser(page, userName) {
  const user = await page.$('.logged-in-user');
  const text = await page.evaluate(user => user.innerText, user);
  expect(text).toEqual(`Current User: ${userName}`);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
