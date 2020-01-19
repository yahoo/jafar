/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  verifyNoError, getFieldText, typeInput, verifyError, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  const errorMessage = 'Some sites are not permitted: ';
  await waitForAsyncToRender(page);

  // Field with id "sites" - verify facebook and valid
  const id = 'sites';
  let text = await getFieldText(page, id);
  expect(text).toContain('facebook.com');
  await verifyNoError(page, id, errorMessage);
 
  // add invalid site 'bla.com'
  await typeInput(page, id, 'bla.com');
  await page.keyboard.down('Enter');
  await waitForAsyncToRender(page);

  // verify error and button disabled
  text = await getFieldText(page, id);
  expect(text).toContain('facebook.com');
  expect(text).toContain('bla.com');
  await verifyError(page, id, `${errorMessage}bla.com`);

  // remove invalid sites
  await page.keyboard.down('Backspace');
  await waitForAsyncToRender(page);

  // verify no error
  await verifyNoError(page, id, errorMessage);

  // add site of instagram.com
  await typeInput(page, id, 'instagram.com');
  await page.keyboard.down('Enter');
  await waitForAsyncToRender(page);

  // verify no error
  await verifyNoError(page, id, errorMessage);

  // click save and verify form is clean
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
