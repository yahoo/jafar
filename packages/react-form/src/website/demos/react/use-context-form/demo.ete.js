/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for validators errors to finish evaluate
  await waitForAsyncToRender(page);

  // make sure 2 errors in the errors summary
  let summary = await page.$(`#errors-summary`);
  let text = await page.evaluate(el => el.innerText, summary);
  expect(text).toContain('Error in Name: Field required');
  expect(text).toContain('Error in Last Name: Field required');

  // Field with id "name" - changes value - causes data viewer data to change.
  let id = 'name';
  let initialValue = '';
  let leafPath = 'name';
  let addValue = 'ross';
  await testInput(page, id, leafPath, initialValue, addValue);
  await waitForAsyncToRender(page);

  // make sure error not exists in summary
  summary = await page.$(`#errors-summary`);
  text = await page.evaluate(el => el.innerText, summary);
  expect(text).not.toContain('Error in Name: Field required');

  // Field with id "lastName" - changes value - causes data viewer data to change.
  id = 'lastName';
  initialValue = '';
  leafPath = 'lastName';
  addValue = 'geller';
  await testInput(page, id, leafPath, initialValue, addValue);
  await waitForAsyncToRender(page);

  // make sure error not exists in summary
  summary = await page.$(`#errors-summary`);
  text = await page.evaluate(el => el.innerText, summary);
  expect(text).not.toContain('Error in Lat Name: Field required');
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
