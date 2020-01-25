<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
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
        state: {
            maxLength: 30,
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
      firstName: 'Rachel', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Text: {
        renderer: Text,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='firstName' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 'Rachel Green',
    state: {
        placeholder: 'Enter Name',
    },
};

 <Text
    value={state.value}
    state={state.state}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Multiline</h4>

```javascript
initialState = { 
    value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    state: {
        placeholder: 'Enter Name',
        multiline: true,
        rowsMax:10,
    },
};
 <Text
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
        placeholder: 'Enter Name',
    },
};
 <Text
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
    value: 'Rachel Green',
    state: {
        placeholder: 'Enter Name',
    },
};
 <Text
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
    value: 'Rachel Green',
    state: {
        placeholder: 'Enter Name',
    },
};
 <Text
    value={state.value}
    state={state.state}
    invalid={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```