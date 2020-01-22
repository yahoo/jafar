---
id: arguments
title: Arguments
sidebar_label: Arguments
---

Form class initialized with 3 objects: required [model](#model), optional [resources](#resources) and optional 
[settings](#settings)

```
import Form from '@jafar-org/form';

const model = { /*...*/ };
const resources = { /*...*/ };
const settings = { /*...*/ };

const form = new Form();
await form.init(model, resources, settings);
```

`Model` is a Json representation of a specific form, and `Resources` is an object which contains all handlers that model declare of and need during
its lifecycle.

> **Note:** There are few reasons why form definition was split into 2 objects such a [form persistency](form-persistency), [server validation](server-validation),  [undo operation](undo), have the ability to easily understand existing form logic, quick development and the ability to create more tools and operations using the model.


## Model

Json representation of form. Object contains:

| Name          | Type          | Default          | Description |
| ------------- |-------------| ------------| ------------|
| id | string | 'form-${x}' | A unique id of a form in a page. [More info](id) |
| data | object | {} | Data to manipulate by the form which contains fields values. [More info](data) |
| context | object | {} | App data that the fields might depend on during the form's lifecycle. [More info](context) |
| fields | required object | {} | Fields on the form. [More info](fields) |
| errors | array | [] | Reflects the field's errors in the form. [More info](errors) |
| invalid | boolean | false | Flag that reflects if the form is invalid. [More info](invalid) |
| dirty | boolean | false | Flag that reflects if the form is dirty. [More info](dirty) |
| processing | boolean | false | Flag that reflects if the form is busy with processing pending actions. [More info](processing) |
| pendingActions | array | false | Reflects form's pending actions to process (for example change value). [More info](pending-actions) |
| initializedData | object | {} | Reflects form's data after init action done (data might change during it using `dependenciesChange` handler). |
| prevData | object | {} | Reflects form's data prior to the last action processed. |

## Resources

Object which contains all handlers that model declare of and need during its lifecycle. Object contains:

| Name          | Type          | Default          | Description |
| ------------- |-------------| ------------| ------------|
| components | object | {} | Contains all components that field uses during the form's lifecycle. [More info](component) |
| validators | object | {} | Contains all field's validators handlers. [More info](validators) |
| terms | object | {} | Contains all field's terms handlers (such as exclude, disable and require terms). [More info](terms) |
| conversions | object | {} | Contains all field's conversions handlers (used by field's formatters and parsers). [More info](formatter-parser) |
| dependenciesChanges | object | {} | Contains all field's dependenciesChange handlers. [More info](dependencies-change) |
| hooks | object | {} | Contains form hooks handlers. [More info](hooks) |

## Settings

Jafar settings overrides. Object contains:

| Name          | Type          | Default          | Description |
| ------------- |-------------| ------------| ------------|
| changeValueDebounceWait | number | 250 | Debounce ms when calling [changeValue](actions#changevalue) action |
| changeValueDebounceMaxWait | number | 60000 | Debounce max ms when calling [changeValue](actions#changevalue) action |
| changeStateDebounceWait | number | 250 | Debounce ms when calling [changeState](actions#changestate) action |
| changeStateDebounceMaxWait | number | 60000 | Debounce mac ms when calling [changeState](actions#changestate) action |