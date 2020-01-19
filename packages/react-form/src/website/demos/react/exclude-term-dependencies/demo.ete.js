/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testDropdown, testInputNumber, getInput, testSaveChangesData, CORE_CYCLE_TIME,
} from '../../../e2e.utils';

export default async function (page) {
  // wait for async exclude term to finish evaluate
  await waitForAsyncToRender(page);

  // make sure field "seasonNumber" is not excluded - appear on the page
  let input = await getInput(page, 'seasonNumber');
  expect(input).toBeTruthy();

  // make sure field "episodeNumber" is excluded - not appear on the page
  input = await getInput(page, 'episodeNumber');
  expect(input).toBeFalsy();

  // field with id "contentType" - changes value - causes data viewer data to change
  let id = 'contentType';
  let initialValue = 'SERIES';
  let initialText = 'Series';
  let leafPath = 'contentType';
  let newValue = 'TV_SHOW';
  let newText = 'Tv Show';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText);
  await waitForAsyncToRender(page);

  // make sure field "seasonNumber" is excluded - not appear on the page.
  input = await getInput(page, 'seasonNumber');
  expect(input).toBeFalsy();

  // make sure field "episodeNumber" is excluded - not appear on the page
  input = await getInput(page, 'episodeNumber');
  expect(input).toBeFalsy();

  // change back contentType to select SERIES
  initialValue = 'TV_SHOW';
  initialText = 'Tv Show';
  newValue = 'SERIES';
  newText = 'Series';
  await testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText);
  await waitForAsyncToRender(page);

  // make sure field "episodeNumber" is excluded - not appear on the page
  input = await getInput(page, 'episodeNumber');
  expect(input).toBeFalsy();

  // change seasonNumber to 1
  id = 'seasonNumber';
  initialValue = '';
  leafPath = 'seasonNumber';
  newValue = '1';
  await testInputNumber(page, id, leafPath, initialValue, newValue);
  await waitForAsyncToRender(page);

  // make sure field "episodeNumber" is not excluded - appear on the page
  input = await getInput(page, 'episodeNumber');
  expect(input).toBeTruthy();

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
  await page.waitFor(CORE_CYCLE_TIME);
}
