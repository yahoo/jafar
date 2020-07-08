/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default async function (page) {
  // verify that all sections appears in the body
  let section = await page.$('[id="personal-information"]');
  expect(section).toBeTruthy();
  section = await page.$('[id="job-information"]');
  expect(section).toBeTruthy();
  section = await page.$('[id="raw-data"]');
  expect(section).toBeTruthy();
}
