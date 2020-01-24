<div class="component-description">Represent value of any type</div>
<a class="component-src" target="_blank" href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/Dropdown/Dropdown.jsx">Source</a>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    friends: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'Dropdown',
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
      bestFriend: '2', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    Dropdown: {
      renderer: Dropdown,
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
    value: 'BASKETBALL',
    state: {
      items: [{
          value: 'BASKETBALL',
          label: 'Basketball'
        }, {
          value: 'FOOTBALL',
          label: 'Football'
        }, {
          value: 'SHOP',
          label: 'Shop'
        }, {
          value: 'FASHION',
          label: 'Fashion'
        }, {
          value: 'COOK',
          label: 'Cook'
        }]
    },
};

 <Dropdown
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
          value: 'BASKETBALL',
          label: 'Basketball'
        }, {
          value: 'FOOTBALL',
          label: 'Football'
        }, {
          value: 'SHOP',
          label: 'Shop'
        }, {
          value: 'FASHION',
          label: 'Fashion'
        }, {
          value: 'COOK',
          label: 'Cook'
        }]
    },
};
 <Dropdown
    value={state.value}
    state={state.state}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Item's value as any object</h4>

```jsx
const items = [{
          value: {type: 'hobbit', name: 'Frodo'},
          label: 'Frodo'
        }, {
          value: {type: 'hobbit', name: 'Sam'},
          label: 'Sam'
        }, {
          value: {type: 'hobbit', name: 'Pippin'},
          label: 'Pippin'
        }, {
          value: {type: 'elf', name: 'Legolas'},
          label: 'Legolas'
        }, {
          value: {type: 'dwarf', name: 'Gilmli'},
          label: 'Gilmli'
        }]
initialState = { 
    value: {type: 'hobbit', name: 'Pippin'},
    state: {
      items,
    },
};
 <Dropdown
    value={state.value}
    state={state.state}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Required</h4>

```javascript
initialState = { 
    value: 'BASKETBALL',
    state: {
      items: [{
          value: 'BASKETBALL',
          label: 'Basketball'
        }, {
          value: 'FOOTBALL',
          label: 'Football'
        }, {
          value: 'SHOP',
          label: 'Shop'
        }, {
          value: 'FASHION',
          label: 'Fashion'
        }, {
          value: 'COOK',
          label: 'Cook'
        }]
    },
};
 <Dropdown
    value={state.value}
    state={state.state}
    required={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```

<h4>Disabled</h4>

```javascript
initialState = { 
    value: 'FOOTBALL',
    state: {
      items: [{
          value: 'BASKETBALL',
          label: 'Basketball'
        }, {
          value: 'FOOTBALL',
          label: 'Football'
        }, {
          value: 'SHOP',
          label: 'Shop'
        }, {
          value: 'FASHION',
          label: 'Fashion'
        }, {
          value: 'COOK',
          label: 'Cook'
        }]
    },
};
 <Dropdown
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
    value: 'FOOTBALL',
    state: {
      items: [{
          value: 'BASKETBALL',
          label: 'Basketball'
        }, {
          value: 'FOOTBALL',
          label: 'Football'
        }, {
          value: 'SHOP',
          label: 'Shop'
        }, {
          value: 'FASHION',
          label: 'Fashion'
        }, {
          value: 'COOK',
          label: 'Cook'
        }]
    },
};
 <Dropdown
    value={state.value}
    state={state.state}
    invalid={true}
    onValueChange={(value) => {
        setState({ value });
    }}
    />
```