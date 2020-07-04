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
  root: '#jafar-react-editor-demos',
  jsonView: '[aria-label="json-view"]',
  optionsMenuButton: '[aria-label="Options"]',
  showJsonMenuItem: '[id="options-menu"] [role="menuitem"]:nth-child(1)',
  formListWrapper: '#form-list',
  formsGridRows: '[aria-label="grid"] [aria-label="grid-row"]',
  formsGridCreateButton: '[aria-label="grid"] [aria-label="grid-header-menu"] button:nth-child(2)',
  formsGridInitButton: '[aria-label="grid"] [aria-label="grid-header-menu"] button:nth-child(1)',
  formEditorWrapper: '[aria-label="form-editor"]',
  formDataEditor: '[id="data"]',
  saveButton: '[aria-label="Footer"] button[button-type="primary"]',
  addFieldButton: '[id="fields"] [aria-label="grid-header-menu"] button',
  fieldEditorWrapper: '[aria-label="field-editor"]',
  fieldsGridRows: '[id="fields"] [aria-label="grid-row"]',
  addValidator: 'div[id="validators"] [aria-label="add-validator"]',
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

async function verifyJsonView(page, expectedJson) {
  const jsonString = await page.$eval(selectors.jsonView, e => e.getAttribute('value'));
  const json = JSON.parse(jsonString);
  expect(json).toEqual(expectedJson);
}

async function testCreateNewForm(page) {
  await page.waitFor(ANIMATION_DURATION);

  // verify we are in form list page
  const formListWrapper = await page.$(selectors.formListWrapper);
  expect(formListWrapper).toBeTruthy();
  
  // verify form list page has no forms
  let formsGridRows = await page.$$(selectors.formsGridRows);
  expect(formsGridRows).toHaveLength(0);

  // click init forms button
  await page.click(selectors.formsGridInitButton);
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify form list page has 1 form
  formsGridRows = await page.$$(selectors.formsGridRows);
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
  // expectedFormJson.model.fields[lastNameField.id] = lastNameField;
  // delete expectedFormJson.model.fields[lastNameField.id].id;
  // await verifyJsonView(page, expectedFormJson);



  // click show json

  // verify form json

  // save form

  // verify form is in the list of forms

  // click on edit that form

  // verify its data there

  // click cancel

  // click remove form

  // verify form is not in the list anymore
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
  await textFieldTypeText(page, 'path', 'firstName');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.path = 'firstName';
  await verifyJsonView(page, expectedFieldJson);

  // save field
  await page.waitFor(JAFAR_LIFECYCLE);
  const saveButton = await page.$(`${selectors.fieldEditorWrapper} ${selectors.saveButton}`);
  await saveButton.click();
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify field in the list of fields
  const fieldsGridRows = await page.$$(selectors.fieldsGridRows);
  expect(fieldsGridRows).toHaveLength(1);

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
  await textFieldTypeText(page, 'path', 'lastName');
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.path = 'lastName';
  await verifyJsonView(page, expectedFieldJson);

  // verify field dependenciesChange not exists
  const dependenciesChangeField = await page.$(`div[id="dependenciesChange"]`);
  expect(dependenciesChangeField).toBeFalsy();

  // enter field dependencies - open dropdown
  await selectFromDropdown(page, 'dependencies', 1);
  await page.waitFor(JAFAR_LIFECYCLE);
  expectedFieldJson.dependencies = ['firstName'];
  await verifyJsonView(page, expectedFieldJson);

  // enter field dependenciesChange
  await fillHandler(page, 'dependenciesChange', 1);
  expectedFieldJson.dependenciesChange = { name: 'someCustomName', args: { a: 'b' } };
  await verifyJsonView(page, expectedFieldJson);

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

  // add exclude term

  // add require term

  // add label

  // add description

  // verify formatter and parser are excluded

  // add component

  // verify formatter and parser are included

  // add formatter and parser

  // click show json

  // verify show json

  // click save field

  // verify 2 fields in the list of fields

  return expectedFieldJson;
}

async function fillHandler(page, id, child, selector = '') {
  await selectFromDropdown(page, id, child, selector);
  if (child === 1) { // first child is 'custom'
    await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="${id}"] ${selector} input[placeholder="Custom name"]`, 
    'someCustomName');
  }
  // add args
  const toggle = await page.$(`div[id="${id}"] ${selector} [class="MuiSwitch-root"]`);
  await clickOnElementAtPosition(page, toggle, 3, 3);
  await page.waitFor(JAFAR_LIFECYCLE);
  await jsonEditorTypeText(page, `${selectors.fieldEditorWrapper} div[id="${id}"] ${selector} [name="outer-box"]`, '{ "a": "b"');
  await page.waitFor(JAFAR_LIFECYCLE);
}
