---
id: form-overview
title: Form Overview
sidebar_label: Overview
---

Jafar's Form class is initiated with a form definition - model & resources (jsons) that represent the entire form lifescycle - such as fields and their corresponding data path, initial data, validators, dto conversions and more. It exposes actions such a `changeValue` (which changes a field value) that enables developers to manipulate the form's model and data in particular.

> **Note:** currently both form logic definitions (such as path, validators and more) and form ui definitions (such as field's component, label and description) are defined and handled together in the form class lifecycle for simplicity. You can still define a form class without any ui definitions.

### Form class usage

The following is a simple form class test example:

```javascript
import Form from '@jafar-org/form';
import UserService from './UserService';

// define form model object that will be the initial state of the form
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
      },
    },
    lastName: {
      label: 'Last Name',
      path: 'lastName',
    },
    email: {
      label: 'Email',
      path: 'email',
      validators: [{
        name: 'email',
      }, {
        name: 'uniqueField',
        args: { serverField: 'email' }
      }],
    },
  },
  data: {
    firstName: 'Ross',
    lastName: 'Geller',
    email: 'unagi@salmonskinroll.com',
  },
};

// define form resources object that contains all the handlers that the model needs
// note - 'minLength' and "email" are built-in validators - therefor not needed here
const resources = {
  validators: {
    uniqueField: {
      func: async ({ value, args }) => {
        return await UserService.isFieldUnique(args.serverField, value);
      },
      message: ({ value }) => `${ value } is already taken`,
    }
  },
  hooks: {
    submit: ({ data }) => {
      UserService.save(data);
    }
  }
};

// create user form instance
const form = new Form();
await form.init(model, resources);

// change field firstName
await form.changeValue('firstName', 'Monica');

expect(form.data).toEqual({ 
  firstName: 'Monica', 
  lastName: 'Geller', 
  email: 'unagi@salmonskinroll.com' 
});

// verify form is valid
expect(form.invalid).toBeFalsy();

// change field firstName to undefined
await form.changeValue('firstName', '');
expect(form.data).toEqual({ lastName: 'Geller', email: 'unagi@salmonskinroll.com' });

// verify form is invalid (since field 'firstName' is required and has minimum length)
expect(form.invalid).toBeTruthy();
expect(form.fields.firstName.errors).toEqual([{
  name: 'required',
  message: 'Field required',
}, {
  name: 'minLength',
  message: 'Minimum length is 2',
}]);

// alert the user about the invalid first name he need to fix
const errors = form.fields.firstName.errors.map(e => e.message).join(', ');
console.log(`field: "${form.fields.firstName.label}" has errors of: ${errors}`);

// make form valid again
await form.changeValue('firstName', 'Monica');

// submit the form
const success = await form.submit();

// verify submit success
expect(success).toEqual(true);
```