<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    person: {
      label: 'Person',
      path: 'person',
      component: {
        name: 'JsonView',
      }
    },
  },
  data: {
      person: { 
        firstName: 'Rachel',
        lastName: 'Green', 
      }, 
  },
};

const resources = {
  components: { 
    JsonView: {
      renderer: JsonView,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='person' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: { 
      firstName: 'Rachel',
      lastName: 'Green', 
    }
};

<JsonView value={state.value} />
```
