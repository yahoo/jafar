<h3>Represent a string</h3>

<h4>Usage in jafar form</h4>

```javascript
const Text = require('../../edit/Text/index.js').default;
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    firstName: {
      label: 'First Name',
      path: 'firstName',
      component: {
        name: 'Text',
      },
      required: true,
      validators: [{
        name: 'minLength',
        args: { value: 5 }
      }],
    },
  },
};

const resources = {
  components: { 
      Text: { renderer: Text }, 
  },
  terms: {
    excludeMe: {
      func: () => false, // convert to true to see the field excluded
    },
  },
};

<Form model={model} resources={resources}>
  <Field id='firstName' />
  <FormErrors onClickField={fieldId => console.log(fieldId)} />
</Form>
```

