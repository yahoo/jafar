/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  clearInputValue, inputTypeText, itemSelectors as selectors, ANIMATION_DURATION,
} from '../../e2e.utils';

export default async function (page) {
  // verify layout scroll
  await verifyLayoutScroll(page);

  // verify layout tabs
  await verifyLayoutTabs(page);

  // verify layout mobile
  await verifyLayoutMobile(page);

  // verify layout undefined
  await verifyLayoutUndefined(page);

  // verify item manipulation
  await verifyItemManipulation(page);
}

async function verifyLayoutScroll(page) {
  // check layout scroll
  await page.click(selectors.radioLayout('scroll'));

  // verify layout scroll
  await page.waitFor(selectors.selectedRadioLayout('scroll'));

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
  await page.waitFor(2 * ANIMATION_DURATION);

  // verify that sections body top offset has changed
  scrollTop = await page.$eval(selectors.sectionsWrapper, e => e.scrollTop);
  expect(scrollTop > 0).toBeTruthy();
}

async function verifyLayoutTabs(page) {
  // check layout tabs
  await page.click(selectors.radioLayout('tabs'));

  // verify layout tabs
  await page.waitFor(selectors.selectedRadioLayout('tabs'));

  // verity that second tab is selected
  await page.waitFor(selectors.tab(2, true));

  // verify that only second section appears in the body
  const sections = await page.$$(selectors.sections);
  expect(sections).toHaveLength(1);
}

async function verifyLayoutMobile(page) {
  // check layout mobile
  await page.click(selectors.radioLayout('mobile'));

  // verify layout mobile
  await page.waitFor(selectors.selectedRadioLayout('mobile'));

  // verity that no tabs exists
  const tabs = await page.$(selectors.tabs);
  expect(tabs).toBeFalsy();

  // verify that all sections appears in the body
  const sections = await page.$$(selectors.sections);
  expect(sections).toHaveLength(3);
}

async function verifyLayoutUndefined(page) {
  // check layout undefined
  await page.click(selectors.radioLayout('undefined'));

  // verify layout undefined
  await page.waitFor(selectors.selectedRadioLayout('undefined'));

  // verity that no tabs exists
  const tabs = await page.$(selectors.tabs);
  expect(tabs).toBeFalsy();

  // verify that all sections appears in the body
  const sections = await page.$$(selectors.sections);
  expect(sections).toHaveLength(3);
}

async function verifyItemManipulation(page) {
  // check layout scroll
  await page.click(selectors.radioLayout('scroll'));

  // footer buttons are not disabled
  const footerButtons = await page.$$(`${selectors.footerButtons} button:not([disabled])`);
  expect(footerButtons).toHaveLength(1);

  // click menu item
  await page.click(selectors.optionsMenu);

  // wait for open animation
  await page.waitFor(ANIMATION_DURATION);

  // verify 4 actions not disabled
  const menuItems = await page.$$(selectors.menuItem);
  expect(menuItems).toHaveLength(4);
  await page.click(`${selectors.menuItem}:nth-child(1)`);
  await page.waitFor(ANIMATION_DURATION);

  // change department field to 'HR' to disable and exclude menu item options
  await page.click('div#department [role="button"]');
  await page.waitFor(ANIMATION_DURATION);
  await page.click('li[role="option"]:nth-child(4)');
  await page.waitFor(ANIMATION_DURATION);

  // verify menu items changed as expected
  await page.click(selectors.optionsMenu);
  await page.waitFor(ANIMATION_DURATION);
  const items = await page.$$(selectors.menuItem);
  expect(items).toHaveLength(3);
  const disabledItems = await page.$$(`${selectors.menuItem}[aria-disabled="true"]`);
  expect(disabledItems).toHaveLength(1);
  await page.click(`${selectors.menuItem}:nth-child(1)`);
  await page.waitFor(ANIMATION_DURATION);

  // delete input first name test
  await clearInputValue(page, '#firstName input');
  await page.waitFor(ANIMATION_DURATION);

  // check that save buttons are disabled
  const disabledFooterButtons = await page.$$(`${selectors.footerButtons} button[disabled]`);
  expect(disabledFooterButtons).toHaveLength(2);

  // type in first name
  await inputTypeText(page, '#firstName input', 'Monica');
  await page.waitFor(ANIMATION_DURATION);

  // click save
  await page.click(`${selectors.footerButtons} button[button-type="primary"]`);
}
