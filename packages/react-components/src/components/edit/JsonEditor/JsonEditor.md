
<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    options: {
      label: 'Options',
      path: 'options',
      component: {
        name: 'JsonEditor',
        state: {
            height: '150px',
        }
      },
      required: true,
      validators: [{
          name: 'numberValues',
      }],
      disableTerm: {
          name: 'disableMe',
      },
      excludeTerm: {
          name: 'excludeMe',
      },
    },
  },
  data: {
      options: undefined,
  },
};

const resources = {
  components: { 
      JsonEditor: {
          renderer: JsonEditor,
      }, 
  },
  validators: {
      numberValues: {
          func: props => !Object.values(props.value).find(x => isNaN(x)),
          message: () => 'All values must be numbers',
      },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='options' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: { height: '20px', width: '20px' },
};

<JsonEditor
    value={state.value}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```

<h4>Initial value undefined</h4>

```javascript
initialState = { 
    value: undefined,
};

<JsonEditor
    value={state.value}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```

<h4>Disabled</h4>

```javascript
initialState = { 
    value: { height: '20px', width: '20px' },
};

<JsonEditor
    value={state.value}
    disabled={true}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```
