/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  testInput, testSaveChangesData, getFieldComponentText, isDataViewerContains, getFieldComponentSelector,
  typeInput, asyncForEach,
} from '../../../e2e.utils';

export default async function (page) {
  // Field with id "name" - changes value - causes data viewer data to change
  let id = 'name';
  let initialValue = 'Ralph Lauren Corporation';
  let leafPath = 'name';
  await testInput(page, id, leafPath, initialValue);

  // // Field with id "address" - changes value - causes data viewer data to change
  id = 'address';
  initialValue = 'New York, New York, US';
  leafPath = 'address';
  await testInput(page, id, leafPath, initialValue);

  // Field with id "employees" -
  // 1. verify render (in the field and in the data viewer)
  // find field and make sure it was loaded with the initialValue
  id = 'employees';
  let employees = [
    { firstName: 'Rachel', lastName: 'Green' },
    { firstName: 'Joanna', lastName: 'Unknown' },
  ];
  await verifyEmployees(page, id, employees);

  // 2. remove Joanna employee
  const componentSelector = getFieldComponentSelector(id);
  await page.click(`${componentSelector} li:nth-child(2) span`);
  await page.waitFor(400);

  // 3. verify render (in the field and in the data viewer)
  let exists = await isDataViewerContains(page, 'firstName', 'Joanna');
  expect(exists).toBeFalsy();
  exists = await isDataViewerContains(page, 'lastName', 'Unknown');
  expect(exists).toBeFalsy();

  // 4. click add new employee
  await page.click(`${componentSelector} button`);
  await page.waitFor(400);

  // 5. verify modal opened with save button disabled
  await page.waitFor('[role="presentation"] button[aria-label="Save"][disabled]');

  // 6. enter name, lastName
  await typeInput(page, 'firstName', 'Tag');
  await typeInput(page, 'lastName', 'Jones');
  await page.waitFor(400);

  // 7. click save
  await page.click('[role="presentation"] button[aria-label="Save"]');
  await page.waitFor(400);

  // 8. verify render (in the field and in the data viewer)
  employees = [
    { firstName: 'Rachel', lastName: 'Green' },
    { firstName: 'Tag', lastName: 'Jones' },
  ];
  await verifyEmployees(page, id, employees);

  // Save click - call changeData with correct data
  const newData = {};
  await testSaveChangesData(page, newData, 0);
}

async function verifyEmployees(page, id, employees) {
  await asyncForEach(employees, async (employee, index) => {
    const text = await getFieldComponentText(page, id);
    expect(text).toContain(`${index + 1}. ${employee.firstName} X`);

    // find the data viewer and make sure it loaded with the initialValue
    let exists = await isDataViewerContains(page, 'firstName', employee.firstName);
    expect(exists).toBeTruthy();
    exists = await isDataViewerContains(page, 'lastName', employee.lastName);
    expect(exists).toBeTruthy();
  });
}
