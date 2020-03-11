/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

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

export async function textFieldTypeText(page, id, text) {
  const input = await page.$(`div[id="${id}"] input`);
  await input.focus();
  await page.keyboard.type(text);
}

export async function inputTypeText(page, inputSelector, text) {
  const input = await page.$(inputSelector);
  await input.focus();
  await page.keyboard.type(text);
}

export async function jsonEditorTypeText(page, wrapperSelector, text) {
  const selector = `${wrapperSelector} [contenteditable="true"]`;
  await page.evaluate((selector, text) => { 
    document.querySelector(`${selector} span[type="symbol"][value="{"]`).innerHTML = text; 
  }, selector, text);
  await page.evaluate((selector) => { document.querySelector(selector).focus(); }, selector);
  await page.evaluate((selector) => { document.querySelector(selector).blur(); }, selector);
}
