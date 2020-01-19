/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testDropdown, testInputNumber, getInput, testSaveChangesData,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async disable term to finish evaluate.
  await waitForAsyncToRender(page);

  // make sure field "seasonNumber" is not disabled.
  let input = await getInput(page, 'seasonNumber');
  let disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeFalsy();

  // make sure field "episodeNumber" is disabled
  input = await getInput(page, 'episodeNumber');
  disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();

  // field with id "contentType" - changes value - causes data viewer data to change
  let id = 'contentType';
  let initialValue = 'SERIES';
  let initialText = 'Series';
  let leafPath = 'contentType';
  let newValue = 'TV_SHOW';
  let newText = 'Tv Show';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText);
  await waitForAsyncToRender(page);

  // make sure field "seasonNumber" is disabled
  input = await getInput(page, 'seasonNumber');
  disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();

  // make sure field "episodeNumber" is disabled
  input = await getInput(page, 'episodeNumber');
  disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();

  // change back contentType to select SERIES
  initialValue = 'TV_SHOW';
  initialText = 'Tv Show';
  newValue = 'SERIES';
  newText = 'Series';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText);
  await waitForAsyncToRender(page);

  // make sure field "episodeNumber" is disabled
  input = await getInput(page, 'episodeNumber');
  disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeTruthy();

  // change seasonNumber to 1
  id = 'seasonNumber';
  initialValue = '';
  leafPath = 'seasonNumber';
  newValue = '1';
  await testInputNumber(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // make sure field "episodeNumber" is not disabled
  input = await getInput(page, 'episodeNumber');
  disabled = await page.evaluate(input => input.disabled, input);
  expect(disabled).toBeFalsy();

  // change episodeNumber to 2
  id = 'episodeNumber';
  initialValue = '';
  leafPath = 'episodeNumber';
  newValue = '2';
  await testInputNumber(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function waitForAsyncToRender(page) {
  await page.waitFor(400);
}
