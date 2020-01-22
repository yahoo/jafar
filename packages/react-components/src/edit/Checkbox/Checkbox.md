<h3>Represent a boolean value</h3> 

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    agreeToTerms: {
      label: 'Agree to site Terms',
      path: 'agreeToTerms',
      component: {
        name: 'Checkbox',
        state: {
            label: 'I read the site terms and I agree to the terms',
        }
      },
      required: true,
      validators: [{
          name: 'mustAgree',
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
      agreeToTerms: undefined,
  },
};

const resources = {
  components: { 
      Checkbox: {
          renderer: Checkbox,
      }, 
  },
  validators: {
      mustAgree: {
          func: props => props.value === true,
          message: () => 'You must agree to the terms',
      },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='agreeToTerms' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: true,
};

<Checkbox
    value={state.value}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```

<h4>With label</h4>

```javascript
initialState = { 
    value: true,
    state: {
        label: 'Click me',
    }
};

<Checkbox
    value={state.value}
    state={state.state}
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

<Checkbox
    value={state.value}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```

<h4>Disabled</h4>

```javascript
initialState = { 
    value: true,
};

<Checkbox
    value={state.value}
    disabled={true}
    onValueChange={(value) => {
        setState({ value });
    }}
/>
```