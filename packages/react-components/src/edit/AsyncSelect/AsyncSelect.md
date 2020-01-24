<div class="component-description">Represent a selection of a single item from async items list</div>
<a class="component-src" target="_blank" href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/AsyncSelect/AsyncSelect.jsx">Source</a>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const mockServerItems = [{
  id: '1',
  name: 'Ross Geller'
}, {
  id: '2',
  name: 'Monica Geller'
}, {
  id: '3',
  name: 'Rachel Green'
}, {
  id: '4',
  name: 'Chandler Bing'
}, {
  id: '5',
  name: 'Joey Tribbiani'
}, {
  id: '6',
  name: 'Phoebe Buffay'
}];

const mockService = {
  get: (id) => {
    return new Promise(resolve => {
      const item = mockServerItems.find(x => x.id === id);
      resolve(item);
    });
  },
  search: (query) => {
    return new Promise(resolve => {
      const items = mockServerItems.filter(x => x.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
      resolve(items);
    });
  },
};

const model = {
  id: 'simple',
  fields: {
    bestFriend: {
      label: 'Best Friend',
      path: 'bestFriend',
      component: {
        name: 'AsyncSelect',
        stateChange: { name: 'friendStateChange' },
      },
      formatter: { name: 'friendFormatter' },
      parser: { name: 'friendParser' },
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
    bestFriend: '3', // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    AsyncSelect: {
      renderer: AsyncSelect,
        stateChange:  (props) => {    
        // if search filter has changed - return object with cleared items and 
        // change isLoading indication to true
        if (props.prevState && (props.prevState.searchQuery !== props.state.searchQuery)) {
          return { ...props.state, items: [], isLoading: true };
        }

        // else, if isLoading changes to true,
        // begin search and return promise which resolves an object of: { items: [ ... ], isLoading: false }
        if (props.state.isLoading) {
          return new Promise((resolve) => {
            // mock server call
            mockService.search(props.state.searchQuery).then((items) => {
              const viewItems = items.map(x => { return { label: x.name, value: x.id }; });
              resolve({ ...props.state, items: viewItems, isLoading: false });
            });
          });
        }

        // else - no more changes needed
        return undefined;
      },
    },
  },
  conversions: {
    friendFormatter: {
      func: (props) => {
        return new Promise((resolve) => {
          // mock server call
          mockService.get(props.value).then((item) => {
            resolve({ label: item.name, value: item.id });
          });
        });  
      } 
    },
    friendParser: {
      func: (props) => {
        return props.value.value; // (props.value is the item { label, value })
      },
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
  value: { value: '3', label: 'Rachel Green' },
};

<AsyncSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
onStateChange={(newState) => {
  newState.items = [];
  newState.isLoading = true;
  setState({ state: newState });

  setTimeout(() => {
    const items = [{
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

    const filteredItems = items.filter(x => x.label.toLowerCase().indexOf(newState.searchQuery.toLowerCase()) > -1);
    const newState2 = Object.assign({}, newState);
    newState2.items = filteredItems;
    newState2.isLoading = false;
    setState({ state: newState2 });
  }, 700);
}}
/>
```

<h4>Value as object</h4>

```javascript
initialState = { 
  value: { 
    value: { id: '3', first: 'Rachel', last: 'Green' }, 
    label: 'Rachel Green' 
  },
};

<AsyncSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
onStateChange={(newState) => {
  newState.items = [];
  newState.isLoading = true;
  setState({ state: newState });

  setTimeout(() => {
    const items = [{
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
    }];

    const filteredItems = items.filter(x => x.label.toLowerCase().indexOf(newState.searchQuery.toLowerCase()) > -1);
    const newState2 = Object.assign({}, newState);
    newState2.items = filteredItems;
    newState2.isLoading = false;
    setState({ state: newState2 });
  }, 700);
}}
/>
  ```

<h4>Required (cant unselect)</h4>

```javascript
initialState = { 
  value: { value: '3', label: 'Rachel Green' },
};

<AsyncSelect
value={state.value}
state={state.state}
required={true}
onValueChange={(value) => {
  setState({ value });
}}
onStateChange={(newState) => {
  newState.items = [];
  newState.isLoading = true;
  setState({ state: newState });

  setTimeout(() => {
    const items = [{
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

    const filteredItems = items.filter(x => x.label.toLowerCase().indexOf(newState.searchQuery.toLowerCase()) > -1);
    const newState2 = Object.assign({}, newState);
    newState2.items = filteredItems;
    newState2.isLoading = false;
    setState({ state: newState2 });
  }, 700);
}}
/>
```

<h4>Disabled</h4>

```javascript
initialState = { 
  value: { value: '3', label: 'Rachel Green' },
};

<AsyncSelect
value={state.value}
state={state.state}
disabled={true}
onValueChange={(value) => {
  setState({ value });
}}
onStateChange={(newState) => {
  newState.items = [];
  newState.isLoading = true;
  setState({ state: newState });

  setTimeout(() => {
    const items = [{
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

    const filteredItems = items.filter(x => x.label.toLowerCase().indexOf(newState.searchQuery.toLowerCase()) > -1);
    const newState2 = Object.assign({}, newState);
    newState2.items = filteredItems;
    newState2.isLoading = false;
    setState({ state: newState2 });
  }, 700);
}}
/>
```

<h4>Value undefined</h4>

```javascript
initialState = { 
  value: undefined,
};

<AsyncSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
onStateChange={(newState) => {
  newState.items = [];
  newState.isLoading = true;
  setState({ state: newState });

  setTimeout(() => {
    const items = [{
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

    const filteredItems = items.filter(x => x.label.toLowerCase().indexOf(newState.searchQuery.toLowerCase()) > -1);
    const newState2 = Object.assign({}, newState);
    newState2.items = filteredItems;
    newState2.isLoading = false;
    setState({ state: newState2 });
  }, 700);
}}
/>
```
