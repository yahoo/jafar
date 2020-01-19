---
id: required
title: Required
sidebar_label: Required
---

Define required in a field in order to protect and verify form / field validity. Form evaluates required validation
during its lifecycle. It affects [field.empty](field.html#empty) flag, [field.invalid](field.html#invalid) flag and [field.errors](errors) object.

## Required Field

Define `field.required = true` in order to make it required. Form evaluates required validation using [isEmpty](hooks.html#isempty) function.
If a field is required and evaluated as empty, a required error is set to the [field.errors](field.html#errors) with a message which is evaluated using [emptyMessage](hooks.html#emptymessage) function. Override for both of these [hooks](hooks.html) can be done by supplying override functions
in the `resources.hooks` object (for more details visit [hooks](hooks.html)).

> **Note:** [validators](validators.html) array is separated from the `required` definition. Validators are evaluated only 
if the field is [not empty](hooks.html#isempty).

### Require Term

In some cases a field might be required only under some certain terms (i.e `model.fields.someField.required` value is dynamic).
It can be achieved by defining `requireTerm` instead of `required`. For more details see [Require Term](require-term.html).

### Validation Logic

Validations logic during a field evaluation can be found in [validation logic](actions.html#validation-logic).

### Example

Name field is required, requires a value with minimum length of 2 chars, and unique in the database:

```javascript
import MyService from './MyService';

const model = {
  // ...
  fields: {
    // ...
    name: {
      // ...
      required: true,
      validators: [{
        name: 'minLength' // a key in resources.validators object
        args: {
          value: 2
        }
      }, {
        name: 'uniqueField', // a key in resources.validators object
        args: {
          serverField: 'userName',
        },
      }]
    }
  }, 
};

// note - 'minLength' is a built-in validator - therefor not needed here
const resources = {
  // ...
  validators: { 
    uniqueField: {
      func: (props) => { // props = { id, value, dependencies { id: { value } }, args }
        return MyService.isFieldUnique(props.args.serverField, props.value); // async call, return promise that resolves to true / false
      },
      message: (props) => {
        return `${props.label} should be unique`;
      }
    }
  },
};
```

### Logical Required Field VS UX Required Field

In terms of 'logical required' - if a field is required and empty, then its invalid - making the Form class instance to be invalid, in order to mark that the current form's data is not valid to be saved. In this case a required error is added to the field's errors.

In terms of 'UX experience' required field is not considered to be invalid message, and should not be marked with 'error' color (such as red).
The reason is because when a field is empty on init and the user hasn't entered any data yet, a required message can be shown in a solid color (such as grey color), instead of giving the user a feeling he did something wrong, when he didn't even touch anything yet. Required in these terms
is a 'lake of data' and not 'invalid' (there is still no data to validate).