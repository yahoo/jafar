/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getInput, CORE_CYCLE_TIME, typeInput,
} from '../../../e2e.utils';

export default async function (page) {
  // verify form is empty
  await verifyPageData(page, { firstName: '', lastName: '', address: '' });

  // verify save button disabled
  let saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // verify first row
  let users = await page.$$('[aria-label="User"] > span');
  let firstUserText = await page.evaluate(x => x.innerText, users[0]);
  expect(firstUserText).toEqual('1. Rachel Green');

  // click edit on first row
  await page.click('[aria-label="User"] [aria-label="Edit"]');
  await page.waitFor(CORE_CYCLE_TIME);

  // verify data was loaded to the right form
  await verifyPageData(page, { firstName: 'Rachel', lastName: 'Green', address: '90 Bedford Street' });

  // change last name
  await typeInput(page, 'lastName', '2');

  // click save
  await page.click('[aria-label="Save"]');
  await page.waitFor(CORE_CYCLE_TIME);

  // verify form is clean
  await verifyPageData(page, { firstName: '', lastName: '', address: '' });
  saveButton = await page.$('button[aria-label="Save"][disabled]');
  expect(saveButton).toBeTruthy();

  // verify data changed in the users
  users = await page.$$('[aria-label="User"] span');
  firstUserText = await page.evaluate(x => x.innerText, users[0]);
  expect(firstUserText).toEqual('1. Rachel Green2');

  // fill the form with new user
  await typeInput(page, 'firstName', 'Janice');
  await typeInput(page, 'lastName', 'Litman-Goralnik');
  await typeInput(page, 'address', 'Everywhere');

  // click save
  await page.click('[aria-label="Save"]');
  await page.waitFor(CORE_CYCLE_TIME);

  // verify user was added to the list
  users = await page.$$('[aria-label="User"] > span');
  const lastUserText = await page.evaluate(x => x.innerText, users[6]);
  expect(lastUserText).toEqual('7. Janice Litman-Goralnik');
}

async function verifyPageData(page, pageData) {
  // verify field 'firstName'
  let input = await getInput(page, 'firstName', pageData.firstName);
  expect(input).toBeTruthy();

  // verify field 'lastName'
  input = await getInput(page, 'lastName', pageData.lastName);
  expect(input).toBeTruthy();

  // verify field 'address'
  input = await getInput(page, 'address', pageData.address);
  expect(input).toBeTruthy();
}
