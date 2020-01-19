# JAFAR

Jafar - not `Just another form application renderer`, a set of tools which implement form capabilities using a simple JSON form object, containing fields and plenty of advanced features.

## Table Of Content

* [Background & Usage](#background-&-usage)
* [Install](#install)
* [Examples](#examples)
* [Docs & Demos](#docs-&-demos)
* [Run Demos Locally](#run-demos-locally)
* [Contribute](#contribute)
* [Maintainers](#maintainers)
* [Licence](#licence)

## Background & Usage

Managing complicated forms is a hard task for developers. Dealing with field validations, dependencies, disable or exclude fields in some conditions and more can
make the code complicated, hard to maintain and hard to write to begin with.

Jafar let developers build forms easily by defining a readable and intuitive form definition (model json & resources json) that represent the entire form lifescycle - such as fields and their corresponding data path, initial data, validators, dto conversions and more. It's based on a pure javascript, ui free form class which handles the form's definition, lifecycle and data manipulations. With the basic form class, any ui library (such as react, angular and vue) can easily use it to expose Form and Field components.

### Highlights

* Manage Complicated Forms
* Framework Agnostic
* High Performance
* Form Persistency
* Full Lifecycle Log
* Replay Client Actions For Debug
* Form Snapshots and Undo Operations
* Server Side Validation
* Grid Usage
* UI Components And Layout Supply
* Vast Documentation And Demos
* Low Dependencies Number
* Small Package Size
* High Test Coverage


## Install

Install form (javascript Form class)

`npm install --save @jafar/form`

Install react-form (Form & Field components)

`npm install --save @jafar/react-form`

Install react-components (Text, Number, Checkbox and more)

`npm install --save @jafar/react-components`

Install react-layout (Item, Sections and more)

`npm install --save @jafar/react-layout`

## Examples

The following is a simple `Form class` test example:

### Form class

```javascript
import Form from '@jafar/form';
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
    submit: async ({ data }) => {
      return await UserService.save(data);
    }
  }
};

// create user form instance
const form = new Form();
await form.init(model, resources);

// verify form is valid
expect(form.invalid).toBeFalsy();

// change field firstName
await form.changeValue('firstName', 'Monica');

// verify form is valid
expect(form.invalid).toBeFalsy();

// change field firstName to undefined
await form.changeValue('firstName', '');

// verify form is invalid (since field 'firstName' is required and has minimum length)
expect(form.invalid).toBeTruthy();

// verify errors
expect(form.fields.firstName.errors).toEqual([
  { name: 'required', message: 'Field required' }, 
  { name: 'minLength', message: 'Minimum length is 2' }
]);

// make form valid again
await form.changeValue('firstName', 'Monica');

// submit the form
const success = await form.submit();

// verify submit success
expect(success).toEqual(true);
```

### React Form Component

The following is a simple react `Form` & `Field` components (based on `Form class`) example:

```jsx
import { Form, Field } from '@jafar/react-form';

const model = { /*...*/ };
const resources = { /*...*/ };

<Form model={model} resources={resources}>
  <h2>Basic Info</h2>
  <Field id="firstName" />
  <Field id="lastName" />
  <h2>Contact Info</h2>
  <Field id="email" />
</Form>
```

## Docs & Demos

Jafar's full docs and demos are [available here](https://yahoo.github.io/jafar).

## Run Demos Locally

### React Form Demos

First clone Jafar
```
git clone https://github.com/yahoo/jafar.git
```

To run react-form demos locally:
```
cd /jafar/packages/react-form && npm start
```

To run react-components demos locally:
```
cd /jafar/packages/react-components && npm start
```

To run react-layout demos locally:
```
cd /jafar/packages/react-layout && npm start
```

## Contribute 

Please refer to the [CONTRIBUTING.md](https://github.com/yahoo/jafar/blob/master/CONTRIBUTING.md) file for information about how to get involved. We welcome issues, questions, and pull requests. Pull Requests are welcome.

## Maintainers

* 🐥 Gal Havivi: [galhavivi](https://github.com/galhavivi)
* 🐦 Eran Shapira: [eranshapira](https://github.com/eranshapira)

## Licence 

Jafar is [MIT licensed](https://github.com/yahoo/jafar/blob/master/LICENSE).
