---
id: react-form
title: Form
sidebar_label: Form
---

Form component gets as props form model object and resources object that will list all its settings (such as validations, disable term, field dependencies and more) and lifecycle hooks (such as before and after actions, submit, form level validations and dto conversions). In addition, Form component exposes a context object that includes current form model, resources and actions (such as `changeValue`) to perform on the form. The context can be used within any child component of the Form component (not necessary direct child component). 

## Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| model      | required object | Model object that defines fields, validators and more as described in [Form Class](arguments#model) |
| resources      | object      | Resources object that defines all the handlers that the form model defined as described in [Form Class](arguments#resources) |
| settings      | object | Settings overrides object as described in [Form Class](arguments#settings) |
| data      | object      | Pass [data](data) as a prop outside the model object - only when data might change outside the Form component during the app life. On `init` - Form will applies data to the model and pass the final model to the underline [Form class](form-overview) instance, and when data prop reference changes only `changeData` action called on the underline form instance. |
| context      | object      | Pass [context](context) as a prop outside the model object - only when context might change outside the Form component during the app life. On `init` - Form will applies context to the model and pass the final model to the underline [Form class](form-overview) instance, and when context prop reference changes only `changeContext` action called on the underline form instance. |

## Example

```jsx
import { Form, Field } from '@jafar/react-form';
import SomeInputText from './my-components/Text.jsx';

const model = {
  id: 'user-form',
  fields: {
    firstName: {
      path: 'firstName',
      label: 'First Name',
      description: 'Enter user first name',
      component: {
        name: 'InputText',
      },
    },
    lastName: {
      path: 'lastName',
      label: 'Last Name',
      component: {
        name: 'InputText',
      },
    },
    data: {
      firstName: 'Roos',
      lastName: 'Geller',
    }
  },
};

const resources = {
  components: {
    InputText: { renderer: SomeInputText },
  }
};

<Form model={model} resources={resources}>
  <h2>User Details</h2>
  <Field id="firstName" />
  <Field id="lastName" />
</Form>
```

## Context

Form provides a context object used by direct and non-direct children components. 

> **Note:** In `@jafar/react-form` - `context` refer to the data provided by the `Form` component object, which can be consumed by each
underline component (i.e react's context feature). Whereas in `@jafar/form` [context](context) refers to the app data which is stored in the model to
serve the form's lifecycle handlers.

### Context object 

Context object contains: 

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| model         | object | The current model object. Can be used to pull data for an underline component. For instance, a save button component, should use form data to disable the button in some cases |
| resources     | object      | The current resources object |
| actions       | object      | actions object contains a set of function to be called in order to manipulate the from. Full actions docs can be found [here](actions.html) |
| parent       | object      | parent form [context](react-form#context-object) object |

For Example:

```javascript
const reset = () => {
  context.actions.reset();
};

<Button disabled={context.model.invalid || context.model.processing || 
  !context.model.dirty} onClick={reset}>Reset</Button>
```

### Context Consume

In order to use the Form context in child components, components first need to consume Form context.

Example using class component:

```javascript
import React from 'react';
import { FormContext } from '@jafar/react-form';

class ErrorsSummary extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <h4>Errors summary:</h4>
      {
          Object.values(this.context.model.fields).map((field, i) => (<ul key={i}>
            { field.errors.map((error, index) => <li key={index}>Error in {field.label}: {error.message}</li>) }
          </ul>))
      }
    </div>);
  }
}
```

Example using functional component:

```javascript
import React, { useContext } from 'react';
import { FormContext } from '@jafar/react-form';

const ErrorsSummary = () => {
  const context = useContext(FormContext);

  return (<div>
    <h4>Errors summary:</h4>
    {
        Object.values(context.model.fields).map((field, i) => (<ul key={i}>
          { field.errors.map((error, index) => <li key={index}>Error in {field.label}: {error.message}</li>) }
        </ul>))
    }
  </div>);
};
```

### Context Usage

Components declared inside a Form tag component can define contextType of form, and then
use `this.context` to gain access to the form context.

Examples
1. Jafar [Field component](componentsField.html) - consumes the form context and interacts with it. It uses the
`this.context.model` to get field's data, `this.context.actions.changeValue` and `this.context.actions.changeState` actions to notify the form about a change in the component.
2. Your custom component. You can define another custom components to interact with the form like `SaveButton`

Example

```javascript
import React from 'react';
import Button from '@material-ui/core/Button';
import { FormContext } from '@jafar/react-form';

export default class SaveButton extends React.Component {
  static contextType = FormContext;

  render() {
    return (<Button disabled={this.context.model.invalid} onClick={this.onSave}></Button>);
  }

  onSave = () => {
    // save data to the server
    serverCallToSaveData(this.context.model.data).then(() => {
      // reset the form to its initial state
      this.context.actions.reset();
    });
  }
}
```

3. Pass to custom components any additional data (for example app data) through resources or model objects that are passed via context.

Example

```javascript
const model = {
  // ...
  appData: {
    user: { /* ... */ },
    currency: 'USD',
  },
}

export default class Currency extends React.Component {
  static contextType = FormContext;

  render() {
    return (<Input
      type="number" 
      value={this.props.value} 
      onChange={this.onValueChange} 
      endAdornment={<Label value={this.context.model.appData.currency}/>}/>);
  }

  onValueChange = (e) => {
    this.props.onValueChange(e.target.value);
  }
}
```

## Using createForm helper
Instead of defining multiple custom inner components using form context (like the above SaveButton), you can use our `createForm` function. This function
gets a form definition (model & resources) and returns an HOC that gets your single component. Your component should define its context as the form context, and then the form context will be available in your component.

Example
```javascript
import { Field, FormContext, createForm } from '@jafar/react-form';
import Button from '@material-ui/core/Button';
import form from '../form'; // object of { model, resources }

class MyComponent extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <h2>User Details</h2>
      <Field id="firstName" />
      <Field id="lastName" />
      <Button disabled={this.context.model.invalid} onClick={this.onSave}></Button>
    </div>
     );
  }

  onSave = () => {
    // save data to the server
    serverCallToSaveData(this.context.model.data).then(() => {
      // reset the form to its initial state
      this.context.actions.reset();
    });
  }
}

return createForm(form)(MyComponent);
```
