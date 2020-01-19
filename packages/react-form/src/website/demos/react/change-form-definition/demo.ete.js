/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testText, testInput,
} from '../../../e2e.utils';

export default async function (page) {
  // test edit form
  await testEditForm(page);

  // click button "change form"
  let saveButton = await page.$('button');
  await saveButton.click();

  // test view form
  await testViewForm(page);

  await waitForAsyncToRender(page);

  // click button "change form" back to edit
  saveButton = await page.$('button');
  await saveButton.click();

  // test edit form
  await testEditForm(page);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}

async function testEditForm(page) {
  // Field with id "id" - readonly
  let id = 'id';
  let initialValue = '123456';
  let leafPath = 'id';
  await testText(page, id, leafPath, initialValue);

  // Field with id "firstName" - changes value - causes data viewer data to change
  id = 'firstName';
  initialValue = 'Rachel';
  leafPath = 'firstName';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "lastName" - changes value - causes data viewer data to change
  id = 'lastName';
  initialValue = 'Green';
  leafPath = 'lastName';
  await testInput(page, id, leafPath, initialValue);
}

async function testViewForm(page) {
  // Field with id "id" - readonly
  let id = 'id';
  let initialValue = '123456';
  let leafPath = 'id';
  await testText(page, id, leafPath, initialValue);

  // Field with id "firstName" - changes value - causes data viewer data to change
  id = 'firstName';
  initialValue = 'Rachel';
  leafPath = 'firstName';
  await testText(page, id, leafPath, initialValue);

  // Field with id "lastName" - changes value - causes data viewer data to change
  id = 'lastName';
  initialValue = 'Green';
  leafPath = 'lastName';
  await testText(page, id, leafPath, initialValue);
}
