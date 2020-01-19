<h4>Simple</h4>

```javascript
const CheckboxCollection = require('CheckboxCollection').default;
initialState = { 
    value: [],
};
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

<CheckboxCollection
value={state.value}
items={items}
onChange={(value) => { 
    setState({ value });
    console.log(`onChange: ${value}`);
}}
/>
```

<h4>Disabled</h4>

```javascript
const CheckboxCollection = require('CheckboxCollection').default;
initialState = { 
    value: [],
};
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

<CheckboxCollection
value={state.value}
items={items}
disabled={true}
onChange={(value) => { 
    setState({ value });
    console.log(`onChange: ${value}`);
}}
/>

```

<h4>Inline</h4>

```javascript
const CheckboxCollection = require('CheckboxCollection').default;
initialState = { 
    value: [],
};

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

<CheckboxCollection
value={state.value}
items={items}
inline={true}
onChange={(value) => { 
    setState({ value });
    console.log(`onChange: ${value}`);
}}
/>
```

<h4>Search</h4>

```javascript
const CheckboxCollection = require('CheckboxCollection').default;
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
    search: {
        value: '',
        placeholder: 'Search'
    },
    items: allItems,
};

<CheckboxCollection
value={state.value}
items={state.items}
search={state.search}
onChange={(value) => { 
    setState({ value });
    console.log(`onChange: ${value}`);
}}
onSearchChange={(value) => { 
    const search = Object.assign({}, state.search);
    Object.assign(search, {value});
    const items = allItems.filter(x => { 
            return x.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
    setState({ search, items });

    console.log(`onSearchChange: ${value}`);
}}
/>
```

<h4>Async Search</h4>

```javascript
const CheckboxCollection = require('CheckboxCollection').default;
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
    search: {
        value: '',
        placeholder: 'Search'
    },
    items: allItems,
};

<CheckboxCollection
value={state.value}
items={state.items}
search={state.search}
onChange={(value) => { 
    setState({ value });
    console.log(`onChange: ${value}`);
}}
onSearchChange={(value) => { 
    const search = Object.assign({}, state.search);
    Object.assign(search, {value});
    setState({ 
        search,
        items: [],
    });

    setTimeout(() => {
        const items = allItems.filter(x => { 
            return x.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });

        setState({ items });
    }, 300); 

    console.log(`onSearchChange: ${value}`);
}}
/>
```