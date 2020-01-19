/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  verifyError,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async require term to finish evaluate
  await waitForAsyncToRender(page);

  // verify field firstName is required
  const id = 'firstName';
  const errorMessage = 'Field required';
  await verifyError(page, id, errorMessage);

}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
