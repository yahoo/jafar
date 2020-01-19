/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  CORE_CYCLE_TIME, getInput, typeInput,
} from '../../../e2e.utils';

export default async function (page) {
  // check that has 6 grid rows and enabled edit buttons
  const editButtons = await page.$$('button[type="button"]:not([disabled])');
  expect(editButtons).toHaveLength(6);
  const row1EditButtonText = await page.evaluate(b => b.innerText, editButtons[0]);
  expect(row1EditButtonText).toEqual('EDIT');

  // click edit on second row
  editButtons[1].click();
  await page.waitFor(CORE_CYCLE_TIME);

  // verify save is disabled
  const row2SaveButton = await page.$('button[type="button"][disabled]');
  expect(row2SaveButton).toBeTruthy();
  const row2SaveButtonText = await page.evaluate(b => b.innerText, row2SaveButton);
  expect(row2SaveButtonText).toEqual('SAVE');

  // change data of row number 2 of first name and verify change
  let id = 'firstName';
  let initialValue = 'Ross';
  let type = 'a';
  let row2FirstNameInput = await getInput(page, id, initialValue);
  await typeInput(page, id, 'a');
  let newValue = `${initialValue}${type}`;
  row2FirstNameInput = await getInput(page, id, newValue);
  expect(row2FirstNameInput).toBeTruthy();

  // click edit on last row
  let buttons = await page.$$('button[type="button"]');
  buttons[buttons.length - 1].click();
  await page.waitFor(CORE_CYCLE_TIME);

  // make sure to have now 2 editable rows
  const inputs = await page.$$('[id="lastName"] input');
  expect(inputs).toHaveLength(2);

  // change the lastName of the last row
  id = 'lastName';
  initialValue = 'Bing';
  type = 'a';
  let row6LastNameInput = await page.$(`[id="${id}"] input[value="${initialValue}"]`);
  await row6LastNameInput.focus();
  await page.keyboard.type(type);
  await page.waitFor(CORE_CYCLE_TIME);
  newValue = `${initialValue}${type}`;
  row6LastNameInput = await page.$(`[id="${id}"] input[value="${newValue}"]`);
  expect(row6LastNameInput).toBeTruthy();

  // save the second row
  buttons = await page.$$('button[type="button"]');
  buttons[1].click();
  await page.waitFor(CORE_CYCLE_TIME);

  // check that the form has change and the data was updated
  id = 'firstName';
  const firstNames = await page.$$(`[id="${id}"]`);
  expect(editButtons).toHaveLength(6);
  const row2FirstNameText = await page.evaluate(x => x.innerText, firstNames[1]);
  expect(row2FirstNameText).toEqual('Rossa');

  // cancel the last row
  buttons = await page.$$('button[type="button"]');
  buttons[buttons.length - 1].click();
  await page.waitFor(CORE_CYCLE_TIME);

  // check that the form has changed and that the data return to original
  id = 'lastName';
  const lastNames = await page.$$(`[id="${id}"]`);
  expect(lastNames).toHaveLength(6);
  const row6LastNameText = await page.evaluate(x => x.innerText, lastNames[5]);
  expect(row6LastNameText).toEqual('Bing');
}
