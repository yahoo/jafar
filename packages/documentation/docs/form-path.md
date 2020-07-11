---
id: path
title: Path
sidebar_label: Path
---

Each field controls a specific part of the form's model [data](data), which determines by the field's path.

## Field Path 

`model.fields.someField.path` - required string. Represent an object path to a specific value in the model [data](data).

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