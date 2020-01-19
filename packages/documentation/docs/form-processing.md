---
id: processing
title: Processing
sidebar_label: Processing
---

`boolean` - Flag that reflects if the form is currently [processing an action](pending-actions.html). 

This does not need to be passed by default in the initial form model json.
It initializes to false on init, and later will be updated while form is handling incoming [action](actions.html).

Example

```javascript
processing: false,
```

### Usage Example

Disable a save button when form is processing.

```
<Button disabled={model.processing}>Save</Button>
```