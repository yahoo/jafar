/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import puppeteer from 'puppeteer';
import { inputTypeText, textFieldTypeText, jsonEditorTypeText } from './e2e.utils';

const MAX_TEST_MILLISECONDS = 60000;
const ANIMATION_DURATION = 50;
const JAFAR_LIFECYCLE = 400;
const viewport = { width: 1440, height: 900 };
const localhostUrl = 'http://localhost:3000/';
const BASE_URL = process.env.DEMO_URL || localhostUrl;
const browsers = [];

const selectors = {
  root: '#jafar-react-editor-demos',
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
  
  // enter form id - "test-form"
  await textFieldTypeText(page, 'id', 'test-form');

  // enter form data
  await jsonEditorTypeText(page, selectors.formDataEditor, '{ "firstName": "Ross"');
  await page.waitFor(ANIMATION_DURATION);

  // enter form settings
  await textFieldTypeText(page, 'changeValueDebounceWait', '1');
  await textFieldTypeText(page, 'changeValueDebounceMaxWait', '1');
  await textFieldTypeText(page, 'changeStateDebounceWait', '1');
  await textFieldTypeText(page, 'changeStateDebounceMaxWait', '1');
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify save is still disabled
  let saveButton = await page.$(`${selectors.saveButton}[disabled]`);
  expect(saveButton).toBeTruthy();

  // click create new field
  await page.click(selectors.addFieldButton);
  await page.waitFor(ANIMATION_DURATION);
  
  // enter field id
  await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="id"] input`, 'firstName');

  // enter field path
  await textFieldTypeText(page, 'path', 'firstName');
  
  // save field
  await page.waitFor(JAFAR_LIFECYCLE);
  saveButton = await page.$(`${selectors.fieldEditorWrapper} ${selectors.saveButton}`);
  await saveButton.click();
  await page.waitFor(JAFAR_LIFECYCLE);

  // verify field in the list of fields
  const fieldsGridRows = await page.$$(selectors.fieldsGridRows);
  expect(fieldsGridRows).toHaveLength(1);

  // click create new field
  await page.click(selectors.addFieldButton);
  await page.waitFor(ANIMATION_DURATION);

  // enter field id
  await inputTypeText(page, `${selectors.fieldEditorWrapper} div[id="id"] input`, 'lastName');

  // enter field path
  await textFieldTypeText(page, 'path', 'lastName');

  // verify field dependenciesChange not exists
  const dependenciesChangeField = await page.$(`div[id="dependenciesChange"]`);
  expect(dependenciesChangeField).toBeFalsy();

  // enter field dependencies

  // enter field dependenciesChange

  // click field required

  // add validator

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
