/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, CORE_CYCLE_TIME,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for circular loop to stop
  await waitForAsyncToRender(page);

  let id = 'first';
  let leafPath = 'first';
  let initialValue = 'aaaa';
  await testInput(page, id, leafPath, initialValue, null);

  // Field with id "second" - as expected
  id = 'second';
  leafPath = 'second';
  initialValue = 'bbbbb';
  await testInput(page, id, leafPath, initialValue, null);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(CORE_CYCLE_TIME);
}
