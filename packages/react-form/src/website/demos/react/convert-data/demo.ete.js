/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getFieldText, testSaveChangesData, typeInput,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "netflixContent" - verify content
  const netflixContentId = 'netflixContent';
  let text = await getFieldText(page, netflixContentId);
  expect(text).toContain('Friends');
  expect(text).toContain('Fauda');
  expect(text).toContain('The spy');

  // Field with id "hboContent" - verify content
  const hboContentId = 'hboContent';
  text = await getFieldText(page, hboContentId);
  expect(text).toContain('Game Of Thrones');

  // add netflix content
  await typeInput(page, netflixContentId, 'Atypical');
  await page.keyboard.down('Enter');
  await waitForAsyncToRender(page);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
  await waitForAsyncToRender(page);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
