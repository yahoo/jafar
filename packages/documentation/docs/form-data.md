---
id: data
title: Data
sidebar_label: Data
---

`object` - Initial form data object which the form fields manipulate.

Example:
```javascript
const model = {
  // ...
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
  },
};
```

If data undefined, data initiates to `{}`
