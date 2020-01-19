---
id: context
title: Context
sidebar_label: Context
---

Define context to a field definition when the field's lifecycle calculations (such as `excludeTerm`, `validators` and more) depend on external app data. 

For example - a specific field can be required only if the logged-in user doesn't have admin permissions (which can be verified using app data that is not part of the form's data).

> **Note:** Form should know how to stand alone. In some cases form depend on app data for calculations. Keep all the dependent app data in a single place as `model.context`, in order to mock it easily when needed (such as [tests](test) to the form, or [server validation](server-validation))

## Field Context

 `model.fields.someField.context` - array. Represent array of context keys in [model.context](context#model-context) object. These key's values are injected to all field's lifecycle handlers (such as `excludeTerm`, `validators` and more).

```javascript
model.fields.someField.context = ['loggedInUser'];
```

## Model Context

`model.context` - object. Contains app data that the fields might depend on during the form's lifecycle. Key is the context data id (as appear in [field.context](context#field-context), and value is the context data which will be injected to all field's lifecycle handlers (such as `excludeTerm`, `validators` and more).

```javascript
model.context = {
  companyId: '12345678',
  loggedInUser: { 
    id: '123', 
    permissions: ['EDIT', 'REFUND_USER'] 
  }
}
```

## Example

Field 'refundMoney' is excluded to a user who don't have 'REFUND_USER' permission.

```javascript
const model = {
  id: 'order-form',
  fields: {
    // ...
    refundMoney: {
      path: 'refundMoney',
      component: { name: 'InputNumber' },
      context: ['loggedInUser'],
      excludeTerm: {  // field excluded to users that don't have refund permission
        not: true,
        name: 'hasPermission',
        args: { permission: 'REFUND_USER' }
      }
    } 
  },
  context: {
    loggedInUser: { id: '123', permissions: ['EDIT', 'REFUND_USER'] }
  },
  // ...
}

const resources = {
  terms: {
    hasPermission: {
      func: ({ context, args }) => context.loggedInUser.permissions.includes(args.permission),
    }
  }
}
```

## Change Context

When app data (which relevant to the form) changes, A call to the [changeContext](actions#changecontext) action is required, in-order to update the form with the new context data, and evaluate the form.