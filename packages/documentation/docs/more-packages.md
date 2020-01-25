---
id: packages
title: Packages
sidebar_label: Packages
---
Jafar is built as a monorepo which includes the following packages:

## Structure

![packages-structure](assets/packages-v1.0.0.png)

### @jafar-org/form
[@jafar-org/form](https://github.com/yahoo/jafar/tree/master/packages/form) - contains a javascript form class, that can also server as a base form utility to any UI library (such as React, Angular and Vue).

Usage Example:

```javascript
import Form from '@jafar-org/form';

it('should update the form data on change field value ', async () => {
  const model = {
    id: 'simple',
    data: {},
    fields: {
      name: {
        path: 'name',
      },
      lastName: {
        path: 'lastName',
      },
    },
  };

  const form = new Form();
  await form.init(model);
  expect(form.data).toEqual({});
  await form.changeFieldValue('Rachel', 'name');
  expect(form.data).toEqual({
    name: 'Rachel',
  });
});
```

### @jafar-org/react-form
[@jafar-org/react-form](https://github.com/yahoo/jafar/tree/master/packages/react-form) - contains React [Form and Field](https://yahoo.github.io/jafar/demo-react-form.html) components. Based on `@jafar-org/form`. 

Usage Example: 

```javascript
import { Form, Field } from '@jafar-org/react-form';

const model = {...};

<Form model={model}>
  <h2>User Details</h2>
  <Field id="firstName" />
  <Field id="lastName" />
</Form>
```

### @jafar-org/react-components
[@jafar-org/react-components](https://github.com/yahoo/jafar/tree/master/packages/react-components) - contains common [unified api components](https://yahoo.github.io/jafar/demo-react-components.html) for form usage. Exports common components that can be added to forms.

Usage Example:
```javascript
import TextInput from '@jafar-org/react-components/edit/Text';

const model = {
  // ...
  fields {
    email: {
      // ...
      component: {
        name: 'myTextInput'
      }
    }
  },
};

const resources = {
  components: {
    myTextInput: { renderer: TextInput },
  }
}
```

### @jafar-org/react-layout
[@jafar-org/react-layout](https://github.com/yahoo/jafar/tree/master/packages/react-layout) - contains React Layout components
such as [Item and List](https://yahoo.github.io/jafar/demo-react-layout.html).

Usage Example: 

```javascript
import Item from '@jafar-org/react-layout/Item';

const item = {
  title: 'Edit User',
  sections: [...],
  mainActions: [...],
  optionsActions: [...],
};

<Item item={...item} />
```


### @jafar-org/documentation
[@jafar-org/documentation](https://github.com/yahoo/jafar/tree/master/packages/documentation) - contains [this documentation site](https://yahoo.github.io/jafar/).