/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const CORE_CYCLE_TIME = 400;

export async function verifyError(page, id, errorMessage) {
  let text = await getFieldText(page, id);
  expect(text).toContain(errorMessage);
}

export async function verifyNoError(page, id, errorMessage) {
  let text = await getFieldText(page, id);
  expect(text).not.toContain(errorMessage);
}

export async function testSaveChangesData(page, newData, variableRows) {
  await page.waitFor(CORE_CYCLE_TIME);
  const saveButton = await page.$('button[aria-label="Save"]');
  await saveButton.click();
  await page.waitFor(CORE_CYCLE_TIME);

  await verifyDataViewerData(page, newData, variableRows);
}

export async function testResetForm(page, newData, variableRows) {
  await page.waitFor(CORE_CYCLE_TIME);
  const resetButton = await page.$('button[aria-label="Reset"]');
  await resetButton.click();
  await page.waitFor(CORE_CYCLE_TIME);

  await verifyDataViewerData(page, newData, variableRows);
}

export async function verifyDataViewerData(page, newData, variableRows) {
  const rows = await page.$$(getDataViewerRowsSelector());
  expect(rows).toHaveLength(variableRows);

  // make sure the data viewer has changed
  await asyncForEach(Object.keys(newData), async (leafPath) => {
    const exists = await isDataViewerContains(page, leafPath, newData[leafPath]);
    expect(exists).toBeTruthy();
  });
}

export async function testText(page, id, leafPath, initialValue) {
  // find field and make sure it was loaded with the initialValue
  const text = await getFieldComponentText(page, id);
  expect(text).toEqual(initialValue);
  // find the data viewer and make sure it loaded with the initialValue
  const exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
}

export async function getFieldComponentText(page, id) {
  const field = await getFieldComponent(page, id);
  const text = await page.evaluate(field => field.innerText, field);
  return text;
}

export async function getFieldText(page, id) {
  const field = await getField(page, id);
  const text = await page.evaluate(field => field.innerText, field);
  return text;
}

export async function testInput(page, id, leafPath, initialValue, type = 'a', disableInputCheck = false, clearFirst = false) {
  if (clearFirst) {
    await clearInputValue(page, id);
  }
  // find input and make sure it was loaded with the initialValue
  let input = await getInput(page, id, initialValue);
  expect(input).toBeTruthy();
  // find the data viewer and make sure it loaded with the initialValue
  let exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
  if (type !== null) {
    // add to the initialValue the letters of type
    await typeInput(page, id, type);
    await page.waitFor(CORE_CYCLE_TIME);
    // make sure the input has changed
    const newValue = `${initialValue}${type}`;
    if (!disableInputCheck) {
      input = await getInput(page, id, newValue);
      expect(input).toBeTruthy();
    }
    // make sure the data viewer has changed
    exists = await isDataViewerContains(page, leafPath, newValue);
    expect(exists).toBeTruthy();
  }
}

export async function testInputNumber(page, id, leafPath, initialValue, type = '1') {
  // find input and make sure it was loaded with the initialValue
  const input = await getInput(page, id);
  expect(input).toBeTruthy();
  // find the data viewer and make sure it loaded with the initialValue
  let exists = await isDataViewerContains(page, leafPath, initialValue, true);
  expect(exists).toBeTruthy();
  // add to the initialValue the letters of type
  await typeInput(page, id, type);
  // make sure the input has changed
  // cant check for input numbers cuz they dont put the value on the dom attrs
  const newValue = parseInt(`${initialValue}${type}`).toString(); // eslint-disable-line
  // make sure the data viewer has changed
  exists = await isDataViewerContains(page, leafPath, newValue, true);
  expect(exists).toBeTruthy();
}

export async function testDropdown(page, id, leafPath, initialValue, initialText, newValue, newText) {
  // find input and make sure it was loaded with the initialValue
  let dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  let text = await page.evaluate(el => el.innerText, dropdownButton);
  expect(text).toEqual(initialText);
  // find the data viewer and make sure it loaded with the initialValue
  let exists = await isDataViewerContains(page, leafPath, initialValue);
  expect(exists).toBeTruthy();
  // change selected value
  dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  await dropdownButton.click();
  await page.waitFor(CORE_CYCLE_TIME);
  const newValueItem = await page.$(`li[data-value='"${newValue}"']`);
  await newValueItem.click();
  await page.waitFor(CORE_CYCLE_TIME);
  // make sure the dropdown selected has changed
  dropdownButton = await page.$(`${getFieldSelector(id)} [role="button"]`);
  text = await page.evaluate(el => el.innerText, dropdownButton);
  expect(text).toEqual(newText);
  // make sure the data viewer has changed
  exists = await isDataViewerContains(page, leafPath, newValue);
  expect(exists).toBeTruthy();
}

export async function typeInput(page, id, type) {
  // add to the initialValue the letters of type
  const input = await getInput(page, id);
  await input.focus();
  await page.keyboard.type(type);
  // wait for core cycle to finish evaluate (format...)
  await page.waitFor(CORE_CYCLE_TIME);
}

export async function clearInputValue(page, id) {
  const input = await getInput(page, id);
  await input.focus();
  const inputValue = await page.$eval(getInputSelector(id), el => el.value);
  const chars = inputValue.split('');
  await asyncForEach(chars, async () => {
    await page.keyboard.down('Backspace');
  });
}

export async function testCheckboxCollection(page, id, initialValue, values, addValue) {
  // verify that CheckboxCollection and DataViewer rendered correctly
  await verifyCheckBoxCollectionValuesMatch(page, id, initialValue, values);
  // check an unchecked checkbox
  let input = await getInput(page, id, addValue);
  await input.click();
  await page.waitFor(CORE_CYCLE_TIME);
  // verify checkboxCollection checked the new value
  initialValue.push(addValue);
  await verifyCheckboxesComponentRendered(page, id, initialValue, values);
  // uncheck the new checked checkbox
  input = await getInput(page, id, addValue);
  await input.click();
  await page.waitFor(CORE_CYCLE_TIME);
  // verify checkboxCollection unchecked the new value
  initialValue.splice(initialValue.length - 1);
  await verifyCheckboxesComponentRendered(page, id, initialValue, values);
}

export async function verifyCheckBoxCollectionValuesMatch(page, id, initialValue, values) {
  // verify checkBoxCollection loads the initialValue
  await verifyCheckboxesComponentRendered(page, id, initialValue, values);
  // find the data viewer and make sure it loads the initialValue
  await asyncForEach(values, async (value) => {
    const index = initialValue.indexOf(value);
    const checked = index > -1;
    const exists = await isDataViewerContains(page, index, value);
    if (checked) {
      expect(exists).toBeTruthy();
    } else {
      expect(exists).toBeFalsy();
    }
  });
}

export async function verifyCheckboxesComponentRendered(page, id, checkedValues, filteredValues) {
  await asyncForEach(filteredValues, async (value) => {
    const checked = checkedValues.includes(value);
    const input = await getCheckbox(page, id, value, checked);
    expect(input).toBeTruthy();
  });
}

export async function getField(page, id) {
  const field = await page.$(getFieldSelector(id));
  return field;
}

export async function getFieldComponent(page, id) {
  const field = await page.$(getFieldComponentSelector(id));
  return field;
}

export async function getInput(page, id, value) {
  const input = await page.$(getInputSelector(id, value));
  return input;
}

async function getCheckbox(page, id, value, checked) {
  const input = await page.$(getCheckboxSelector(id, value, checked));
  return input;
}

export async function isDataViewerContains(page, key, value, isNumber) {
  const expectedKey = isNaN(key) ? `"${key}":` : `${key}:`; // eslint-disable-line
  const expectedValue = isNumber ? `${value}` : `"${value}"`;

  const rows = await page.$$eval(getDataViewerRowsSelector(), nodes => (nodes || []).map(element => ({
    key: element && element.children && element.children.length ? element.children[0].innerText : undefined,
    value: element ? (element.querySelector('.string-value') || {}).innerText
    || (element.querySelector('.variable-value') || {}).innerText : undefined,
  })));

  const dataRow = rows.find(row => row.key === expectedKey && row.value === expectedValue);
  return value === '' ? dataRow === undefined : dataRow !== undefined;
}

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) { // eslint-disable-line
    await callback(array[index], index, array); // eslint-disable-line
  }
}

export function getDataViewerRowsSelector() {
  return '.react-json-view .variable-row';
}

function getCheckboxSelector(id, value, checked) {
  return `${getInputSelector(id, value)}[type="checkbox"]${checked ? '[checked]' : ''}`;
}

function getInputSelector(id, value) {
  const valueSelector = !value ? `input[value]` : `input[value="${value}"]`;
  return `${getFieldComponentSelector(id)} ${valueSelector}`;
}

export function getFieldComponentSelector(id) {
  return `${getFieldSelector(id)} [aria-label="Field Component"]`;
}

export function getFieldSelector(id) {
  return `div#${id}`;
}
