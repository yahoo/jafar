/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getInput,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async disable term to finish evaluate
  await waitForAsyncToRender(page);

  // make sure field "firstName" is disabled
  const id = 'firstName';
  const input = await getInput(page, id);
  const disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
