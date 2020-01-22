<h3>Represents a string</h3>

<h4>Usage in jafar form</h4>

 ```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

 const model = {
  id: 'simple',
  fields: {
    favoriteWebsite: {
      label: 'Favorite Website',
      path: 'favoriteWebsite',
      component: {
        name: 'Url',
        state: {
          placeholder: 'Enter url...',
        }
      },
      required: true,
      validators: [{
        name: 'url',
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
      favoriteWebsite: 'http://test.com', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
     Url: {
        renderer: Url,
    },  
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='favoriteWebsite' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 'http://test.com',
    state: {
        placeholder: 'Enter Url',
    },
};

 <Url
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
    state: {
        placeholder: 'Enter Url',
    },
};
 <Url
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
    value: 'http://test.com',
    state: {
        placeholder: 'Enter Url',
    },
};
 <Url
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
    value: 'http://test.com',
    state: {
        placeholder: 'Enter Url',
    },
};
 <Url
    value={state.value}
    state={state.state}
    invalid={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```