<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    friends: {
      label: 'Friends',
      path: 'friends',
      component: {
        name: 'CheckboxCollection',
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
            }]
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
      friends: ['2', '3'], // remove to see initial value undefined, and required error
  },
};

const resources = {
    components: {
        CheckboxCollection: {
            renderer: CheckboxCollection,
        },
    },
    terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='friends' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: ['2', '3'],
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
        }]
    }
};

<CheckboxCollection
value={state.value}
state={state.state}
onValueChange={(value) => { 
    setState({ value });
    console.log(`onValueChange: ${value}`);
}}
/>
```


<h4>Disabled</h4>

```javascript
initialState = { 
    value: [],
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
        }]
    }
};

<CheckboxCollection
value={state.value}
state={state.state}
disabled={true}
onValueChange={(value) => { 
    setState({ value });
    console.log(`onValueChange: ${value}`);
}}
/>

```

<h4>Inline</h4>

```javascript
initialState = { 
    value: [],
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
        }]
    }
};

<CheckboxCollection
value={state.value}
state={state.state}
onValueChange={(value) => { 
    setState({ value });
    console.log(`onValueChange: ${value}`);
}}
/>
```

<h4>Search</h4>

```javascript
const allItems = [{
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
}];

initialState = { 
    value: [],
    state: {
        search: {
            value: '',
            placeholder: 'Search'
        },
        items: allItems,
    }
};

<CheckboxCollection
value={state.value}
state={state.state}
onValueChange={(value) => { 
    setState({ value });
    console.log(`onValueChange: ${value}`);
}}
onStateChange={(state) => { 
    state.items = allItems.filter(x => { 
        return x.label.toLowerCase().indexOf(state.search.value.toLowerCase()) > -1;
    });

    setState({ state });
    console.log(`onStateChange: ${state}`);
}}
/>
```

<h4>Async Search</h4>

```javascript
const allItems = [{
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
}];

initialState = { 
    value: [],
     state: {
        search: {
            value: '',
            placeholder: 'Search'
        },
        items: allItems,
    }
};

<CheckboxCollection
value={state.value}
state={state.state}
onValueChange={(value) => { 
    setState({ value });
    console.log(`onValueChange: ${value}`);
}}
onStateChange={(state) => { 
    setState({ state }, function() {
        setTimeout(() => {
        const items = allItems.filter(x => { 
        return x.label.toLowerCase().indexOf(this.state.state.search.value.toLowerCase()) > -1;
        });

        const updatedState = Object.assign({}, this.state.state);
        updatedState.items = items;
        setState({ state: updatedState });
        }, 200);
    });
}}
/>
```