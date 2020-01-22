<h3>Represent a string value</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    vacationDays: {
      label: 'Vacation Days',
      path: 'vacationDays',
      component: {
        name: 'Number',
      }
    },
  },
  data: {
      vacationDays: 12,
  },
};

const resources = {
  components: { 
    Number: {
      renderer: Number,
    },
  }
};

<Form model={model} resources={resources}>
    <Field id='vacationDays' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 14556.678,
    state: { 
      fixed: 2,
      template: '$NUMBER $',
    },
};

<Number value={state.value} state={state.state} />
```
