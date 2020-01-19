/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const viewport = { width: 1440, height: 900 };
export const ANIMATION_DURATION = 400;

export const itemSelectors = {
  radioLayout: layout => `#layout-select input[type="radio"][value="${layout}"]`,
  selectedRadioLayout: layout => `#layout-select [aria-checked="true"] input[type="radio"][value="${layout}"]`,
  tab: (index, selected) => `[role="tablist"] button:nth-child(${index})${selected ? '[aria-selected="true"]' : ''}`,
  tabs: '[aria-label="Tabs"]',
  sectionsWrapper: '[aria-label="Sections"]',
  sections: '[aria-label="Sections"] > div',
  optionsMenu: '[aria-label="Options"]',
  menuItem: 'li[role="menuitem"]',
  footerButtons: '[aria-label="Footer"]',
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-line
    await callback(array[index], index, array); // eslint-disable-line
  }
}

export async function clearInputValue(page, inputSelector) {
  const input = await page.$(inputSelector);
  await input.focus();
  const inputValue = await page.$eval(inputSelector, el => el.value);
  const chars = inputValue.split('');
  await asyncForEach(chars, async () => {
    await page.keyboard.down('Backspace');
  });
}

export async function inputTypeText(page, inputSelector, text) {
  const input = await page.$(inputSelector);
  await input.focus();
  await page.keyboard.type(text);
}
