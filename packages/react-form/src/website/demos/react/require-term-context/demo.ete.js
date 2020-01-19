/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  verifyError, verifyNoError, clearInputValue, testInput,
} from '../../../e2e.utils';

export default async function (page) {
  const id = 'mergeReason';
  const errorMessage = 'Field required';

  // wait for async require term to finish evaluate.
  await waitForAsyncToRender(page);

  // make sure use normal loaded
  await verifyUser(page, 'NORMAL');

  // // verify field is required
  await verifyError(page, id, errorMessage);

  // verify submit is disabled
  let saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // enter value
  let initialValue = '';
  let leafPath = id;
  await testInput(page, id, leafPath, initialValue, 'abc');

  // verify submit is not disabled
  saveButton = await page.$('button[aria-label="Save"]:not([disabled])');
  expect(saveButton).toBeTruthy();

  // clear value
  await clearInputValue(page, id);
  await waitForAsyncToRender(page);

  // verify submit is disabled
  saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // click on switch user button
  const button = await page.$('.switch-user');
  await button.click();

  // wait for async require term to finish evaluate
  await waitForAsyncToRender(page);

  // make sure use normal-user loaded
  await verifyUser(page, 'ADMIN');

  // verify field is not required
  await verifyNoError(page, id, errorMessage);
}

async function verifyUser(page, userName) {
  const user = await page.$('.logged-in-user');
  const text = await page.evaluate(user => user.innerText, user);
  expect(text).toEqual(`Current User: ${userName}`);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
