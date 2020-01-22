<h3>Represent a number</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    age: {
      label: 'Age',
      path: 'age',
      component: {
        name: 'Number',
        state: {
            placeholder: 'Enter Age',
            min: 0,
        }
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
    age: 18, // remove to see initial value undefined, and required error
  }
};

const resources = {
  components: { 
    Number: {
      renderer: Number,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='age' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 8,
    state: {
        placeholder: 'Enter Number',
        min: 0,
        max: 10,
        step: 1,
        endAdornment: '$',
    },
};

<div>
 <Number
    value={state.value}
    state={state.state}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
    </div>
```

<h4>Initial value undefined</h4>

```javascript
initialState = { 
    value: undefined,
    state: {
        placeholder: 'Enter Number',
    },
};
 <Number
    value={state.value}
    state={state.state}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Disabled</h4>

```javascript
initialState = { 
    value: 42,
    state: {
        placeholder: 'Enter Number',
    },
};
 <Number
    value={state.value}
    state={state.state}
    disabled={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Invalid</h4>

```javascript
initialState = { 
    value: 42,
    state: {
        placeholder: 'Enter Number',
    },
};
 <Number
    value={state.value}
    state={state.state}
    invalid={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```