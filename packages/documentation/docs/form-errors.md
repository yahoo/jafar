---
id: errors
title: Errors
sidebar_label: Errors
---

Form / Field errors are calculate on each relevant action such as init, change value and change data. Errors is a result of both
[required](required) and [validators](validators)

This does not need to be passed by default in the initial form model json.
You can pass it in the initial form model json, if you are currently loading a form model from persist model (i.e you saved the form model before user did page reload - and want to reload the form with the exact same model state that it was before the refresh)

## Field Errors 

`model.fields.someField.errors` - object array. Reflects field's errors. Field errors can contain required error, invalid errors (calculated from `field.validators`) or no errors at all.

#### Error object

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| name | string | Validator name as appears in `field.validators` which represent a key in [resources.validators](validators#resources) 
| message | string | Result of message resource function as appears in [resources.validators](validators#resources) |


## Form Errors

`model.errors` - object. Reflects all errors in a form. Key is field id and value is its errors array as appears in [field errors](errors#field-errors).
Excluded fields are not included in this calculation.

## Example

Create a component of errors summary that shows all form errors, and can read errors directly from `model.errors`.

```javascript
model.errors = {
  email: [
    { name: 'email', message: 'Invalid email' },
  ]
  password: [
    { name: 'minLength', message: 'Minimum length is 2' },
    { name: 'includesOne', message: 'Value should include at least one of ["!", "@", "#", "$", "%", "^", "&", "*"]' },
    { name: 'includesOne', message: 'Value should include at least one of ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]' },
  ]
};
```
