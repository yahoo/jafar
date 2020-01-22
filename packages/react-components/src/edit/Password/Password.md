<h3>Contains password</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    userPassword: {
      label: 'User Password',
      path: 'u',
      component: {
        name: 'Password',
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
      value: 'Im@King22385', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Password: {
      renderer: Password,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='userPassword' />
</Form>
```


<h4>Simple</h4>

```javascript
initialState = { 
    value: 'Im@King22385',
};

 <Password
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
 <Password
    value={state.value}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Disabled</h4>

```javascript
initialState = { 
    value: 'Im@King22385',
};
 <Password
    value={state.value}
    disabled={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Invalid</h4>

```javascript
initialState = { 
    value: 'Im@King22385',
};
 <Password
    value={state.value}
    invalid={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```