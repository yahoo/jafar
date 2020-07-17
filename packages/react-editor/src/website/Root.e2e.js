/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import puppeteer from 'puppeteer';
import { inputTypeText, textFieldTypeText, jsonEditorTypeText, selectFromDropdown, clickOnElementAtPosition } from './e2e.utils';

const MAX_TEST_MILLISECONDS = 60000;
const ANIMATION_DURATION = 50;
const JAFAR_LIFECYCLE = 400;
const viewport = { width: 1440, height: 900 };
const localhostUrl = 'http://localhost:3000/';
const BASE_URL = process.env.DEMO_URL || localhostUrl;
const browsers = [];

const selectors = {
  logo: '#logo',
  root: '#jafar-react-editor-demos',
  home: {
    wrapper: '[aria-label="home-page"]',
    actions: {
      initDB: '[aria-label="init-db"]',
      forms: '[aria-label="forms"]',
    },
  },
  jsonView: '[aria-label="json-view"]',
  optionsMenuButton: '[aria-label="Options"]',
  showJsonMenuItem: '[id="options-menu"] [role="menuitem"]:nth-child(1)',
  formListWrapper: '#form-list',
  formsGridRows: '[aria-label="grid"] [aria-label="grid-row"]',
  formsGridCreateButton: '[aria-label="grid"] [aria-label="grid-header-menu"] button:nth-child(1)',
  formEditorWrapper: '[aria-label="form-editor"]',
  formDataEditor: '[id="data"]',
  saveButton: '[aria-label="Footer"] button[button-type="primary"]',
  cancelButton: '[aria-label="Footer"] button[button-type="tertiary"]',
  addFieldButton: '[id="fields"] [aria-label="grid-header-menu"] button',
  fieldEditorWrapper: '[aria-label="field-editor"]',
  fieldsGridRows: '[id="fields"] [aria-label="grid-row"]',
  addValidator: 'div[id="validators"] [aria-label="add-validator"]',
  rowActionsButton: 'button[aria-label="actions"]',
  rowActionsMenu: '[role="presentation"]',
};

describe('Demos e2e', () => {
  it('Jafar react editor sanity', async () => {
    // wait for the array of parallel tests
    await Promise.all([
      execTest(testCreateNewForm),
    ]);
  }, MAX_TEST_MILLISECONDS);

  afterAll(() => {
    browsers.forEach((browser) => {
      browser.close();
    });
  });
});

async function execTest(testFunc) {
  const browser = await puppeteer.launch({
    headless: true, // !!process.env.CI,
  });

  browsers.push(browser);
  const page = await openTabPageOnBrowser(browser);

  // set animation faster
  await page._client.send('Animation.setPlaybackRate', { playbackRate: 100 });

  let error;

  try {
    await testFunc(page);
  } catch (ex) {
    error = new Error(`Error in test: "${testFunc.name}". ${ex}`);
  }

  const path = `e2e-logs/${testFunc.name}.png`;
  await page.screenshot({ path });

  if (error) {
    throw error;
  }
}

async function openTabPageOnBrowser(browser) {
  const page = await browser.newPage();
  page.emulate({ viewport, userAgent: '' });
  await page.goto(BASE_URL);
  await page.waitForSelector(selectors.root);
  return page;
}

async function testCreateNewForm(page) {
  await page.waitFor(ANIMATION_DURATION);

  // verify we are in home page
  let homeWrapper = await page.$(selectors.home.wrapper);
  expect(homeWrapper).toBeTruthy();

  // click button - go to forms
  await page.click(selectors.home.actions.forms);
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify we are in form list page
  let formListWrapper = await page.$(selectors.formListWrapper);
  expect(formListWrapper).toBeTruthy();
  
  // verify form list page has no forms
  let formsGridRows = await page.$$(selectors.formsGridRows);
  expect(formsGridRows).toHaveLength(0);

  // click logo - go to home
  await page.click(selectors.logo);
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify we are in home page
  homeWrapper = await page.$(selectors.home.wrapper);
  expect(homeWrapper).toBeTruthy();

  // click button - init forms
  await page.click(selectors.home.actions.initDB);
  await page.waitFor(JAFAR_LIFECYCLE);

  // click button - go to forms
  await page.click(selectors.home.actions.forms);
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify we are in form list page
  formListWrapper = await page.$(selectors.formListWrapper);
  expect(formListWrapper).toBeTruthy();

  // verify form list page has 1 form
  formsGridRows = await page.$$(selectors.formsGridRows);
  await page.waitFor(JAFAR_LIFECYCLE);
  expect(formsGridRows).toHaveLength(1);

  // click create new from
  page.click(selectors.formsGridCreateButton);
  await page.waitFor(ANIMATION_DURATION);

  // verify we are on create form page
  const formEditorWrapper = await page.$(selectors.formEditorWrapper);
  expect(formEditorWrapper).toBeTruthy();
  
  // click show json
  await page.click(selectors.optionsMenuButton);
  await page.click(selectors.showJsonMenuItem);
  
  const expectedFormJson = { model: {} };

  // enter form id - "test-form"
  await textFieldTypeText(page, 'id', 'test-form');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFormJson.model.id = 'test-form';
  await verifyJsonView(page, expectedFormJson);

  // enter form data
  await jsonEditorTypeText(page, selectors.formDataEditor, '{ "firstName": "Ross"');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFormJson.model.data = { firstName: 'Ross' };
  await verifyJsonView(page, expectedFormJson);

  // enter form settings
  await textFieldTypeText(page, 'changeValueDebounceWait', '1');
  await textFieldTypeText(page, 'changeValueDebounceMaxWait', '1');
  await textFieldTypeText(page, 'changeStateDebounceWait', '1');
  await textFieldTypeText(page, 'changeStateDebounceMaxWait', '1');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFormJson.settings = { 
    changeValueDebounceWait: 1,
    changeValueDebounceMaxWait: 1,
    changeStateDebounceWait: 1,
    changeStateDebounceMaxWait: 1,
  };
  await verifyJsonView(page, expectedFormJson);

  // verify save is still disabled
  let saveButton = await page.$(`${selectors.saveButton}[disabled]`);
  expect(saveButton).toBeTruthy();

  // add field first name
  const firstNameField = await testCreateFieldFirstName(page);
  expectedFormJson.model.fields = { [firstNameField.id]: firstNameField };
  delete expectedFormJson.model.fields[firstNameField.id].id;
  await verifyJsonView(page, expectedFormJson);

  // add field last name
  const lastNameField = await testCreateFieldLastName(page);
  expectedFormJson.model.fields[lastNameField.id] = lastNameField;
  delete expectedFormJson.model.fields[lastNameField.id].id;
  await verifyJsonView(page, expectedFormJson);

  // save form
  await saveFormAndVerifyRows(page, 2);

  // click on edit that form
  await page.click(`${selectors.formsGridRows}:nth-child(2) ${selectors.rowActionsButton}`);
  await page.waitFor(ANIMATION_DURATION);
  await page.click(`${selectors.rowActionsMenu}:last-child li:nth-child(1)`);
  await page.waitFor(JAFAR_LIFECYCLE);

  // click show json
  await page.click(selectors.optionsMenuButton);
  await page.click(selectors.showJsonMenuItem);

  // verify its data there
  expectedFormJson.id = expectedFormJson.model.id;
  await verifyJsonView(page, expectedFormJson);
}

async function verifyJsonView(page, expectedJson) {
  const jsonString = await page.$eval(selectors.jsonView, e => e.getAttribute('value'));
  const json = JSON.parse(jsonString);
  expect(json).toEqual(expectedJson);
}

async function testCreateFieldFirstName(page) {
  // click create new field
  await page.click(selectors.addFieldButton);
  await page.waitFor(ANIMATION_DURATION);
  
  // click show json
  await page.click(`${selectors.fieldEditorWrapper} ${selectors.optionsMenuButton}`);
  await page.click(selectors.showJsonMenuItem);
  
  const expectedFieldJson = {};

  // enter field id
  await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="id"] input`, 'firstName');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.id = 'firstName';
  await verifyJsonView(page, expectedFieldJson);

  // enter field path
  await fillTextField(page, 'path', 'firstName', expectedFieldJson);

  // save field
  await saveFieldAndVerifyRows(page, 1);

  return expectedFieldJson;
}

async function testCreateFieldLastName(page) {
  // click create new field
  await page.click(selectors.addFieldButton);
  await page.waitFor(ANIMATION_DURATION);
  
  // click show json
  await page.click(`${selectors.fieldEditorWrapper} ${selectors.optionsMenuButton}`);
  await page.click(selectors.showJsonMenuItem);
  
  const expectedFieldJson = {};

  // enter field id
  await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="id"] input`, 'lastName');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.id = 'lastName';
  await verifyJsonView(page, expectedFieldJson);

  // enter field path
  await fillTextField(page, 'path', 'lastName', expectedFieldJson);

  // verify field dependenciesChange not exists
  await verifyFieldMissing(page, 'dependenciesChange');

  // enter field dependencies - open dropdown
  await selectFromDropdown(page, 'dependencies', 1);
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.dependencies = ['firstName'];
  await verifyJsonView(page, expectedFieldJson);

  // enter field dependenciesChange
  await fillHandlerAndVerify(page, 'dependenciesChange', expectedFieldJson);

  // click field required
  await page.click(`div[id="required"] input`);
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.required = true;
  await verifyJsonView(page, expectedFieldJson);

  // add validators
  await page.click(selectors.addValidator);
  await fillHandler(page, 'validators', 1, '[aria-label="Field Component"] > div > div:nth-child(1)');
  await page.click(selectors.addValidator);
  await fillHandler(page, 'validators', 2, '[aria-label="Field Component"] > div > div:nth-child(2)');
  expectedFieldJson.validators = [
    { name: 'someCustomName', args: { a: 'b' } },
    { name: 'between', args: { a: 'b' } },
  ];
  await verifyJsonView(page, expectedFieldJson);

  // add disabled term
  await fillTerm(page, 'disableTerm', expectedFieldJson);

  // add exclude term
  await fillTerm(page, 'excludeTerm', expectedFieldJson);

  // add require term
  await fillTerm(page, 'requireTerm', expectedFieldJson);

  // enter field label
  await fillTextField(page, 'label', 'Last Name', expectedFieldJson);
  
  // enter field description
  await fillTextField(page, 'description', 'Enter Last Name', expectedFieldJson);

  // verify formatter and parser are excluded
  await verifyFieldMissing(page, 'formatter');
  await verifyFieldMissing(page, 'parser');

  // add component
  await fillHandlerAndVerify(page, 'component', expectedFieldJson, 'state');

  // add formatter
  await fillHandlerAndVerify(page, 'formatter', expectedFieldJson);

  // add parser
  await fillHandlerAndVerify(page, 'parser', expectedFieldJson);

  // save field
  await saveFieldAndVerifyRows(page, 2);

  return expectedFieldJson;
}

async function verifyFieldMissing(page, id) {
  const field = await page.$(`div[id="${id}"]`);
  expect(field).toBeFalsy();
}

async function fillTextField(page, id, text, expectedFieldJson) {
  await textFieldTypeText(page, id, text);
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson[id] = text;
  await verifyJsonView(page, expectedFieldJson);
}

async function fillHandlerAndVerify(page, id, expectedFieldJson, argsName = 'args') {
  await fillHandler(page, id, 1);
  expectedFieldJson[id] = { name: 'someCustomName', [argsName]: { a: 'b' } };
  await verifyJsonView(page, expectedFieldJson);
}

async function fillHandler(page, id, child, selector = '') {
  await selectFromDropdown(page, id, child, selector);
  if (child === 1) { // first child is 'custom'
    await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="${id}"] ${selector} input[placeholder="Custom name"]`, 
      'someCustomName');
  }
  // add args
  await addArgs(page, id, selector);
}

async function fillTerm(page, id, expectedFieldJson) {
  // select conditional term
  await selectFromDropdown(page, id, 1);
  // click not
  await page.click(`div[id="${id}"] input[type="checkbox"]`);
  // select and
  await selectFromDropdown(page, id, 2, '[aria-label="Field Component"] > div > div:nth-child(2)');
  // click add terms
  await page.click(`div[id="${id}"] [aria-label="add-term"]`);
  // select 'equals'
  const selector = '[aria-label="Field Component"] > div > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2)';
  await selectFromDropdown(page, id, 3, selector);
  // add args
  // await addArgs(page, id, selector);
  await page.waitFor(JAFAR_LIFECYCLE);

  expectedFieldJson[id] = {
    not: true,
    operator: 'and',
    terms: [{ name: 'equals' }],
  };
  await verifyJsonView(page, expectedFieldJson);
}

async function addArgs(page, id, selector) {
  // turn switch on
  const toggle = await page.$(`div[id="${id}"] ${selector} [class="MuiSwitch-root"]`);
  await clickOnElementAtPosition(page, toggle, 5, 5);
  // add args in the box
  await jsonEditorTypeText(page, `${selectors.fieldEditorWrapper} div[id="${id}"] ${selector} [name="outer-box"]`, '{ "a": "b"');
  await page.waitFor(JAFAR_LIFECYCLE);
}

async function saveFieldAndVerifyRows(page, rows) {
  await saveAndVerifyRows(page, rows, selectors.fieldEditorWrapper, selectors.fieldsGridRows);
}

async function saveFormAndVerifyRows(page, rows) {
  await saveAndVerifyRows(page, rows, '', selectors.formsGridRows);
}

async function saveAndVerifyRows(page, rows, wrapperSelector, rowsSelector) {
  // save field
  await page.waitFor(JAFAR_LIFECYCLE);
  const saveButton = await page.$(`${wrapperSelector} ${selectors.saveButton}`);
  await saveButton.click();
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify field in the list of fields
  const gridRows = await page.$$(rowsSelector);
  expect(gridRows).toHaveLength(rows);
}
