<h3>Switch for boolean values</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    status: {
      label: 'Status',
      path: 'status',
      component: {
        name: 'Switch',
      },
      required: true,
      disableTerm: {
          name: 'disableMe',
      },
      excludeTerm: {
          name: 'excludeMe',
      },
    },
  },
  data: {
      status: true, // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Switch: {
      renderer: Switch,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='status' />
</Form>
```


<h4>Simple</h4>

```javascript
initialState = { 
    status: true,
};

 <Switch
    value={state.status}
    onValueChange={(status) => {
        setState({ status });
    }}
    />
```

<h4>Initial value undefined</h4>

```javascript
initialState = { 
    status: undefined,
};
 <Switch
    value={state.status}
    onValueChange={(status) => {
        setState({ status });
    }}
    />
```

<h4>Disabled</h4>

```javascript
initialState = { 
    status: true,
};
 <Switch
    value={state.status}
    disabled={true}
    onValueChange={(status) => {
        setState({ status });
    }}
    />
```
