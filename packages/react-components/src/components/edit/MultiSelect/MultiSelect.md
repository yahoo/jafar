<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    bestFriends: {
      label: 'Best Friends',
      path: 'bestFriends',
      component: {
        name: 'MultiSelect',
        state: {
        items: [{
                value: '1',
                label: 'Ross Geller'
            }, {
                value: '2',
                label: 'Monica Geller'
            }, {
                value: '3',
                label: 'Rachel Green'
            }, {
                value: '4',
                label: 'Chandler Bing'
            }, {
                value: '5',
                label: 'Joey Tribbiani'
            }, {
                value: '6',
                label: 'Phoebe Buffay'
            }],
        },
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
    bestFriends: ['2', '3'], // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    MultiSelect: {
      renderer: MultiSelect,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='bestFriends' />
</Form>
```

<h4>Simple - fixed items</h4>

```javascript
initialState = { 
  value: ['2', '3'],
  state: {
    items:[{
        value: '1',
        label: 'Ross Geller'
    }, {
        value: '2',
        label: 'Monica Geller'
    }, {
        value: '3',
        label: 'Rachel Green'
    }, {
        value: '4',
        label: 'Chandler Bing'
    }, {
        value: '5',
        label: 'Joey Tribbiani'
    }, {
        value: '6',
        label: 'Phoebe Buffay'
    }],
  },
};

<MultiSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
/>

```

<h4>Value as object</h4>

```javascript
initialState = { 
  value: [{ id: '3', first: 'Rachel', last: 'Green' }],
  state: {
    itemIdField: 'id',
    items:[{
        value: { id: '1', first: 'Ross', last: 'Geller' },
        label: 'Ross Geller'
    }, {
        value: { id: '2', first: 'Monica', last: 'Geller' },
        label: 'Monica Geller'
    }, {
        value: { id: '3', first: 'Rachel', last: 'Green' },
        label: 'Rachel Green'
    }, {
        value: { id: '4', first: 'Chandler', last: 'Bing' },
        label: 'Chandler Bing'
    }, {
        value: { id: '5', first: 'Joey', last: 'Tribbiani' },
        label: 'Joey Tribbiani'
    }, {
        value: { id: '6', first: 'Phoebe', last: 'Buffay' },
        label: 'Phoebe Buffay'
    }],
  },
};

<MultiSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
/>
```

<h4>Searchable</h4>

```javascript
initialState = { 
  value: ['3'],
  state: {
    searchable: true,
    items:[{
        value: '1',
        label: 'Ross Geller'
    }, {
        value: '2',
        label: 'Monica Geller'
    }, {
        value: '3',
        label: 'Rachel Green'
    }, {
        value: '4',
        label: 'Chandler Bing'
    }, {
        value: '5',
        label: 'Joey Tribbiani'
    }, {
        value: '6',
        label: 'Phoebe Buffay'
    }],
  },
};

<MultiSelect
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
  value: ['3', '4'],
  state: {
    items:[{
        value: '1',
        label: 'Ross Geller',
    }, {
        value: '2',
        label: 'Monica Geller'
    }, {
        value: '3',
        label: 'Rachel Green'
    }, {
        value: '4',
        label: 'Chandler Bing'
    }, {
        value: '5',
        label: 'Joey Tribbiani'
    }, {
        value: '6',
        label: 'Phoebe Buffay'
    }],
  },
};

<MultiSelect
value={state.value}
state={state.state}
disabled={true}
onValueChange={(value) => {
  setState({ value });
}}
/>
```

  <h4>Value undefined</h4>

```javascript
initialState = { 
  value: undefined,
  state: {
    items:[{
        value: '1',
        label: 'Ross Geller'
    }, {
        value: '2',
        label: 'Monica Geller'
    }, {
        value: '3',
        label: 'Rachel Green'
    }, {
        value: '4',
        label: 'Chandler Bing'
    }, {
        value: '5',
        label: 'Joey Tribbiani'
    }, {
        value: '6',
        label: 'Phoebe Buffay'
    }],
  },
};

<MultiSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
/>
```