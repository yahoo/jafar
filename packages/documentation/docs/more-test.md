---
id: test
title: Test Jafar
sidebar_label: Test Jafar
---

After defining a page that uses jafar, there are few recommended ways to test jafar in the page.

## Recommended tests

### Verify form definition

Verify form definition is valid. Its very useful when upgrading major version to verify that configuration is still valid,
and if not to understand what need to be changed according to the given error.

Example using jest:

```javascript
import { createForm, verifyForm } from '@jafar/form';
import { model, resources, settings } from './form';

expect.extend({
  toBeValid: ({ model, resources, settings }) => {
    const form = createForm(model, resources, settings);
    let error;
    try {
      verifyForm(form);
    } catch (err) {
      error = err;
    }

    return !error ? {
      pass: true,
      message: () => `form definition is valid`,
    } : {
      pass: false,
      message: () => `expected form definition to be valid, but got error: \n${error}`,
    };
  },
});

it('form definition ok', () => {
  const form = { model, resources };
  expect(form).toBeValid();
});
```

### Handlers unit tests

Resources object contains custom handlers that the form will use during its lifecycle (for example validators). 
Each custom handler is a small block that can be tested via unit tests.

### Form integration tests

Resources handler's arguments (or definition structure in general) might change between major versions.
Since `verifyForm` function does not verify the resources handler's arguments data, Integration tests using Form class can help
cover all users scenarios are working correctly (this can also be done via e2e).

Example of test using jest:

```javascript
import Form from '@jafar/form';

// define user form
const model = {
  id: 'user-form',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      required: true,
      validators: [{
        name: 'minLength'
        args: {
          value: 2
        }
      }],
    },
    lastName: {
      label: 'Last Name',
      path: 'lastName',
    }
  },
  data: {
    firstName: 'Ross',
    lastName: 'Geller',
  }
};

// create user form
const form = new Form();
await form.init(model);

// verify initial data
expect(form.data).toEqual({ firstName: 'Ross', lastName: 'Geller' });

// change field firstName and verify the change
await form.changeValue('firstName', 'Monica');
expect(form.data).toEqual({ firstName: 'Monica', lastName: 'Geller' });

// verify form is  valid
expect(form.invalid).toBeFalsy();

// change field firstName to empty value
await form.changeValue('firstName', '');
expect(form.data).toEqual({ lastName: 'Geller' });

// verify form is invalid (field 'firstName' is required)
expect(form.invalid).toBeTruthy();
expect(form.fields.firstName.errors).toEqual([{
  name: 'required',
  message: 'Field required',
}]);

// change field firstName to 'a'
await form.changeValue('firstName', 'a');
expect(form.data).toEqual({ firstName: 'a', lastName: 'Geller' });

// verify form is invalid (since field 'firstName' has minimum length)
expect(form.invalid).toBeTruthy();
expect(form.fields.firstName.errors).toEqual([{
  name: 'minLength',
  message: 'Minimum length is 2',
}]);
```

### E2E tests

Add e2e tests to verify that your ui was loaded and perform some real user changes to verify it works correctly.
We covered all `@jafar/react-form` [demos with e2e](https://github.com/yahoo/jafar/blob/master/packages/react-form/src/website/Root.e2e.js) using [puppeteer](https://github.com/GoogleChrome/puppeteer).
