/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { itemSelectors as selectors, viewport, ANIMATION_DURATION } from '../../e2e.utils';

export default async function (page) {
  // verify layout scroll
  await verifyLayoutScroll(page);

  // change screen size to smaller
  await page.setViewport({ width: 800, height: 600 });
  await page.waitFor(ANIMATION_DURATION);

  // verify layout mobile
  await verifyLayoutMobile(page);

  // change screen size back to original size
  await page.setViewport(viewport);
  await page.waitFor(ANIMATION_DURATION);
}

async function verifyLayoutScroll(page) {
  // verity that first tab is selected
  await page.waitFor(selectors.tab(1, true));

  // verify that all sections appears in the body
  const sections = await page.$$(selectors.sections);
  expect(sections).toHaveLength(3);

  // click on second tab
  await page.click(selectors.tab(2));

  // verify second tab selected
  await page.waitFor(selectors.tab(2, true));

  // verify that sections body top offset is 0
  let scrollTop = await page.$eval(selectors.sectionsWrapper, e => e.scrollTop);
  expect(scrollTop).toEqual(0);

  // wait for scroll to finish animation
  await page.waitFor(ANIMATION_DURATION);

  // verify that sections body top offset has changed
  scrollTop = await page.$eval(selectors.sectionsWrapper, e => e.scrollTop);
  expect(scrollTop > 0).toBeTruthy();
}

async function verifyLayoutMobile(page) {
  // verity that no tabs exists
  const tabs = await page.$(selectors.tabs);
  expect(tabs).toBeFalsy();

  // verify that all sections appears in the body
  const sections = await page.$$(selectors.sections);
  expect(sections).toHaveLength(2);
}
