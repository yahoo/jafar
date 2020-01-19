---
id: fields
title: Fields
sidebar_label: Fields
---

`required object` - Object which represents the form's fields. `key` is the id of the field and `value` is its props. Each field defines the path in the form data, necessary validations, which UI component it's using (for instance, `checkboxList`), and other extra definitions.

## Field key

`unique string` - unique field id per form.

Example: 
```javascript
'firstName' | 'email' | '12345' | 'e345swer456ef'
```

> **Note:** A recommended practice is to define `id` as closest to the field path as you can, for instance: path of 'email' define key of 'email', and for path of 'addresses.work' define id of 'addressesWork'.

> **Note:** Field path is not the field key (`id`), in-order to allow definition of 1+ different fields (with different components) with the same path. For example, In a video details page, use 2 fields that has path of 'id' which represents video.id data - the first field shows id as string (using label component), and the second field shows the video itself in a player component.

## Field value

`object` - contains the following field properties:

| Name          | Type          | Default          | Description |
| ------------- |-------------| ------------| ------------|
| path | required string |  | Object path to a specific value in the model data. [More info](path) |
| label | string | undefined | By default, renders above the field's component to show the field label |
| description | string | undefined | By default, renders next to the component's label to represent the field description |
| component | object | undefined | Represent a ui component of a field, such as DatePicker, Text, Number and and custom component. [More info](component) |
| formatter | object | undefined | Define formatter to a field component definition when the field's value structure is different then the structure that the component can handle. [More info](formatter-parser) |
| parser | object | undefined | Define parser to a field component definition when the field's value structure is different then the structure that the component can handle. [More info](formatter-parser) |
| dependencies | string array | undefined | Represent an array of fields ids that the current field is depended on at any time of the field's evaluation. [More info](dependencies) |
| dependenciesChange | object | undefined | Define dependencies change for a field, in order to change its value / state when another field has changed its value. [More info](dependencies-change) |
| validators | object array | undefined | Set of objects which describe validators that evaluate on each field value (or one of its dependencies) change. A field is valid when all of the validator functions return true (or has no validators at all). The order of validators corresponds to the order that field.errors appear. [More info](validators) |
| context | string array | undefined | Array of context ids (which represent app data) that the current field is depended on at any time of the field's evaluation. [More info](context) |
| required | boolean | false | Flag that reflects if the field is required. Can be dynamically changed by defining [requireTerm](require-term). [More info](required) |
| excluded | boolean | false | Flag that reflects if the field is excluded. Can be dynamically changed by defining [excludeTerm](exclude-term). [More info](exclude-term) |
| disabled | boolean | false | Flag that reflects if the field is disabled. Can be dynamically changed by defining [disableTerm](disable-term). [More info](disable-term) |
| dirty | boolean | false | Flag that reflects if the field is dirty. [More info](dirty) |
| empty | boolean | false | Flag that reflects if the field is empty. It's a result of [isEmpty](hooks#isempty) hook. [More info](hooks#isempty) |
| invalid | boolean | false | Flag that reflects if the field is invalid. Invalid is a result of both field's [required](required) and [validators](validators). [More info](invalid) |
| errors | object array | [] | Object array that reflects the field's errors. It's a result of both [required](required) and [validators](validators). [More info](errors) |
| excludeTerm | object | undefined | Exclude a field under certain terms (i.e dynamic change of `excluded` flag). Object describes a logical regular expression, which evaluated on init and on each field value (or one of its dependencies) change, and its result is set to field's `excluded` flag. [More info](exclude-term) |
| disableTerm | object | undefined | Disable a field under certain terms (i.e dynamic change of `disabled` flag). Object describes a logical regular expression, which evaluated on init and on each field value (or one of its dependencies) change, and its result is set to field's `disables` flag. [More info](disable-term) |
| requireTerm | object | undefined | Require a field under certain terms (i.e dynamic change of `required` flag). Object describes a logical regular expression, which evaluated on init and on each field value (or one of its dependencies) change, and its result is set to field's [required](required) flag. [More info](require-term) |

## Example

```javascript
const model = {
  // ...
  fields: {
    firstName: {
      path: 'firstName',
      label: 'First Name',
      description: 'Your full name as appears in your passport',
      component: {
        name: 'InputText',
        state: {
          placeholder: 'Enter First Name',
        }
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 2 },
      }],
    },
    hobbies: {
      path: 'hobbies',
      label: 'Hobbies',
      description: 'Activities you enjoy during your free time',
      component: {
        name: 'Checkboxes',
        state: {
          items: [{
            label: 'Dance',
            value: 'DANCE'
          }, {
            label: 'Football',
            value: 'FOOTBALL'
          }, {
            label: 'Baseball',
            value: 'BASEBALL'
          }]
        }
      },
    },
  },
};
```