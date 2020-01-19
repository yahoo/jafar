/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getInput,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async exclude term to finish evaluate.
  await waitForAsyncToRender(page);

  // make sure field "firstName" is excluded - not appear on the page
  const id = 'firstName';
  const input = await getInput(page, id);
  expect(input).toBeFalsy();
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
