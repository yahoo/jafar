<h3>Represent a single select of any value</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    bestFriend: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'RadioGroup',
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
    bestFriend: '2', // remove to see initial value undefined, and required error
  }
};

const resources = {
  components: { 
    RadioGroup: {
      renderer: RadioGroup,
    },
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='bestFriend' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
  value: '2',
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
};

 <RadioGroup
  value={state.value}
  state={state.state}
  onValueChange={(value) => {
    setState({ value });
  }}
  />
```

<h4>Inline</h4>

```javascript
initialState = { 
  value: '4',
  state: {
    inline: true,
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
};
 <RadioGroup
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
};
 <RadioGroup
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
  value: '4',
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
};
 <RadioGroup
  value={state.value}
  state={state.state}
  disabled={true}
  onValueChange={(value) => {
    setState({ value });
  }}
  />
```

<h4>Specific Items disabled</h4>

```javascript
initialState = { 
  value: '4',
  state: {
    items: [{
            value: '1',
            label: 'Ross Geller'
        }, {
            value: '2',
            label: 'Monica Geller',
            disabled: true
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
            label: 'Phoebe Buffay',
            disabled: true
        }],
  },
};

<RadioGroup
  value={state.value}
  state={state.state}
  onValueChange={(value) => {
    setState({ value });
  }}
/>
```