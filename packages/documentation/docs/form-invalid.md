---
id: invalid
title: Invalid
sidebar_label: Invalid
---

Form / Field invalid flags are calculate on each relevant action such as init, change value and change data. Invalid is a result of both field's [required](required) and [validators](validators).

This does not need to be passed by default in the initial form model json.
You can pass it in the initial form model json, if you are currently loading a form model from persist model (i.e you saved the form model before user did page reload - and want to reload the form with the exact same model state that it was before the refresh)

## Field Invalid 

`model.fields.someField.invalid` - boolean. Flag that reflects if the field is invalid. Each field can define a set of validators (field.validators). A field is invalid if at least one of its validators failed.

## Form Invalid

`model.invalid` - boolean. Flag that reflects if the form model is invalid. 
Form is invalid if at least one field is invalid. Excluded fields are not included in this calculation.

## Example

Disable a save button when model is invalid.

```
<Button disabled={model.invalid}>Save</Button>
```