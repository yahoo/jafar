<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    birthDate: {
      label: 'Birth Date',
      path: 'birthDate',
      component: {
        name: 'DateView',
        state: {
          format: 'mmm dd, yyyy',
        }
      }
    },
  },
  data: {
    birthDate: new Date(614466000000),
  },
};

const resources = {
  components: { 
    DateView,
  }
};

<Form model={model} resources={resources}>
    <Field id='birthDate' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: new Date()
};

<DateView value={state.value} />
```
