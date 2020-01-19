---
id: path
title: Path
sidebar_label: Path
---

Form / Field dirty flags are calculate on each relevant action such as init, change value and change data.

This does not need to be passed by default in the initial form model json.
You can pass it in the initial form model json, if you are currently loading a form model from persist model (i.e you saved the form model before user did page reload - and want to reload the form with the exact same model state that it was before the refresh)

## Field Path 

`model.fields.someField.path` - required boolean. Represent object path to a specific value in the model [data](data).

## Example

```javascript
// for data of
data: {
  email: 'rachel.green@friends.com',
  address: {
    home: '90 Bedford Street, NYC',
    work: 'Central Perk coffee shop, 199 Lafayette Street, NYC',
  },
  hobbies: ['DANCE', 'SHOP'],
  friends: [{
    firstName: 'Ross',
    lastName: 'Geller',
  }],
}

// path supports the following formats:
path: 'email' | 'address.home' | 'hobbies' | 'hobbies[1]', 'friends[0].firstName'
```