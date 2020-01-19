/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import puppeteer from 'puppeteer';
import menu from './menu';
import { asyncForEach } from './e2e.utils';

const MAX_TEST_MILLISECONDS = 180000;
const ANIMATION_DURATION = 50;
const localhostUrl = 'http://localhost:3000/';
const BASE_URL = process.env.DEMO_URL || localhostUrl;
const browsers = [];

const selectors = {
  root: '#jafar-react-form-demos',
};

describe('Demos e2e', () => {
  it('Jafar form demos sanity', async () => {
    // wait for the array of parallel tests
    await Promise.all([
      execTest(testHomepageNavigation),
      execTest(testReactDemos),
      execTest(testRouting),
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
  await page._client.send('Animation.setPlaybackRate', { playbackRate: 10 });

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
  page.emulate({ viewport: { width: 1440, height: 900 }, userAgent: '' });
  await page.goto(BASE_URL);
  await page.waitForSelector(selectors.root);
  return page;
}

async function testHomepageNavigation(page) {
  // find the length of the closed navigation items
  const itemsSelector = 'nav [role="button"]';
  const itemsBeforeOpen = await page.$$(itemsSelector);
  expect(itemsBeforeOpen).toHaveLength(10);

  // verify child items not appear yet
  let firstDemo = await page.$('[id="/basics/basic"][role="button"]');
  expect(firstDemo).toBeFalsy();

  // open parent item of "basics"
  await page.click('[id="/basics"][role="button"]');
  await page.waitFor(ANIMATION_DURATION);

  // verify its sub items appear on the screen
  firstDemo = await page.$('[id="/basics/basic"][role="button"]');
  expect(firstDemo).toBeTruthy();

  // verify that home is presented and not any example
  let demoContainer = await page.$('#example-container');
  expect(demoContainer).toBeTruthy();
  let home = await page.$('div#home');
  expect(home).toBeTruthy();

  // click first example item
  await page.click('[id="/basics/basic"][role="button"]');

  // verify that home is not presented and first example is presented
  demoContainer = await page.$('#example-container');
  expect(demoContainer).toBeTruthy();
  let demoHtml = await page.$('#example-html');
  expect(demoHtml).toBeTruthy();
  home = await page.$('div#home');
  expect(home).toBeFalsy();

  // show example code
  await page.click('a#btn-example-code');
  demoHtml = await page.$('#example-html');
  expect(demoHtml).toBeFalsy();
  let demoCode = await page.$('#example-code');
  expect(demoCode).toBeTruthy();

  // back to show example html
  await page.click('a#btn-example-html');
  demoHtml = await page.$('#example-html');
  expect(demoHtml).toBeTruthy();
  demoCode = await page.$('#example-code');
  expect(demoCode).toBeFalsy();

  // click logo / home page
  await page.click('a#logo');

  // verify that default example is presented and not any example
  demoContainer = await page.$('#example-container');
  expect(demoContainer).toBeTruthy();
  home = await page.$('div#home');
  expect(home).toBeTruthy();
}

async function testReactDemos(page) {
  // run demos e2e
  await asyncForEach(menu.slice(1), async (parentItem) => {
    // open parent
    const parentItemSelector = `#\\${parentItem.id}`;
    await page.click(parentItemSelector);
    await page.waitFor(ANIMATION_DURATION);

    // test react demos
    const demos = parentItem.items;
    await testDemos(page, demos);

    // close parent
    await page.click(parentItemSelector);
    await page.waitFor(ANIMATION_DURATION);
  });

  // click logo - home page
  await page.click('a#logo');

  // verify that home is presented and not any example
  const home = await page.$('div#home');
  expect(home).toBeTruthy();
}

async function testDemos(page, demos) {
  await asyncForEach(demos, async (demo) => {
    try {
      await testDemo(page, demo.id, demo.demoWait);
    } catch (ex) {
      throw new Error(`Error in demo: "${demo.id}". ${ex.stack}}`);
    }
  });
}

async function testDemo(page, demoId, demoWait) {
  // click on the demo item om the left sidebar
  const itemSelector = `#${demoId.replace(/\//g, '\\/')}`;
  await page.click(itemSelector);
  
  // verify html tab
  let htmlTabContainer = await page.$('#example-html');
  expect(htmlTabContainer).toBeTruthy();
  await page.waitFor(demoWait);

  // click on markup tab
  await page.click('#btn-example-code');

  // verify markup tab
  const codeTabContainer = await page.$('#example-code');
  expect(codeTabContainer).toBeTruthy();
  const codeTabHtml = await page.$eval('#example-code', e => e.innerHTML);
  expect(codeTabHtml).toContain('Form definition');
  expect(codeTabHtml).toContain('form/fields.js');
  expect(codeTabHtml).toContain('form/components.js');
  expect(codeTabHtml).toContain('form/index.js');
  expect(codeTabHtml).toContain('Components');

  // click on html tab
  await page.click('#btn-example-html');

  // verify back to html tab
  htmlTabContainer = await page.$('#example-html');
  expect(htmlTabContainer).toBeTruthy();

  // manipulate form demo
  let demo;
  menu.forEach((parentItem) => {
    const found = (parentItem.items || []).find(item => item.id === demoId);
    if (found) {
      demo = found;
    }
  });

  const demoMenipulation = demo.e2e;

  if (!demoMenipulation) {
    throw new Error('Demo didnt implement demo.ete.js file to test it\'s demo, or was not added to the src/demos/ete.js file');
  }
  await demoMenipulation(page, demoId);
}

async function testRouting(page) {
  const useCases = {
    createFormHtml: {
      url: 'basics/create-form/html',
      selector: 'div#example-container > h2',
      expectedText: 'Create Form',
    },
    createFormCode: {
      url: 'basics/create-form/code',
      selector: 'div#example-code p',
      expectedText: 'form/fields.js',
    },
  };
    // verify all docs
  await asyncForEach(Object.keys(useCases), async (key) => {
    try {
      const useCase = useCases[key];
      const url = `${BASE_URL}#/${useCase.url}`;
      // goto specific route
      await page.goto(url);
      // get the result
      const res = await page.$eval(useCase.selector, e => e.innerHTML);
      // verify route
      expect(res).toContain(useCase.expectedText);
    } catch (ex) {
      throw new Error(`Error in routing useCase: "${key}". ${ex}`);
    }
  });
}
