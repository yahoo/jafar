
<h3>Represent a selection of multi items from async items list</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

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
  getByIds: (ids) => {
    return new Promise(resolve => {
      const item = mockServerItems.filter(x => ids.find(id => id === x.id));
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
    bestFriends: {
      label: 'Best Friends',
      path: 'bestFriends',
      component: {
        name: 'AsyncMultiSelect',
        stateChange: { name: 'friendsStateChange' },
      },
      formatter: { name: 'friendsFormatter' },
      parser: { name: 'friendsParser' },
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
    AsyncMultiSelect: {
      renderer: AsyncMultiSelect,
      stateChange: (props) => {    
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
              resolve({ ...props.state, items: viewItems, isLoading: false }); // items should contain objects that has { label, value }
            });
          });
        }

        // else - no more changes needed
        return undefined;
      },
    },
  },
  conversions: {
    friendsFormatter: {
      func: (props) => {
        return new Promise((resolve) => {
          // mock server call
          mockService.getByIds(props.value).then((items) => {
            const viewItems = items.map(item => { return { label: item.name, value: item.id  }; });
            resolve(viewItems);
          });
        });  
      },
    },
    friendsParser: {
      func: (props) => {
        return props.value.map(item => item.value); // (props.value is the array [{ label, value }])
      },
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

<h4>Simple</h4>

```javascript
initialState = { 
  value: [{ value: '3', label: 'Rachel Green' }],
};

<AsyncMultiSelect
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
  value: [{ value: { id: '3', first: 'Rachel', last: 'Green' }, label: 'Rachel Green' }],
  state: {
    itemIdField: 'id',
  }
};

<AsyncMultiSelect
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

<h4>Disabled</h4>

```javascript
initialState = { 
  value: [{ value: '3', label: 'Rachel Green' }],
};

<AsyncMultiSelect
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

<AsyncMultiSelect
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