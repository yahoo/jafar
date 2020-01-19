---
id: dirty
title: Dirty
sidebar_label: Dirty
---

Form / Field dirty flags are calculate on each relevant action such as init, change value and change data.

This does not need to be passed by default in the initial form model json.
You can pass it in the initial form model json, if you are currently loading a form model from persist model (i.e you saved the form model before user did page reload - and want to reload the form with the exact same model state that it was before the refresh)

## Field Dirty 

`model.fields.someField.dirty` - boolean. Flag that reflects if the field is dirty. 
A field is dirty when its value is different from the `initialized data` that the form initiated.

> **Note:** Initialized data is the `model.initializedData` that was ready after [init action](actions#init) done. It might not be equals to the initial data - that was passed to the form in the model, since init run also [dependenciesChange](dependencies-change) handlers of fields that might change their value during init. Anyway you can always compare `model.data` to to the initial data - `model.initialModel.data` to know if data was changed from before init and not after init done.

## Form Dirty

`model.dirty` - boolean. Flag that reflects if the form model is dirty. 
Form is dirty if at least one field is dirty. Excluded fields are not included in this calculation.

## Example

Disable a save button when form model is not dirty (no need for un necessary calls to the server).

```
<Button disabled={!model.dirty}>Save</Button>
```