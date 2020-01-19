<h2>This is a sub component of other edit components</h2>
<h4>Simple</h4>

```javascript
const SearchInput = require('SearchInput').default;
initialState = { 
    value: ''
};
<SearchInput 
    value={state.value}
    placeholder="Search"
    onChange={(value) => {
        setState({ value });
        console.log(`onChange: ${value}`);
    }}
    onSearch={(value) => {
        console.log(`onSearch: ${value}`);
    }} />
```

<h4>Disabled</h4>

```javascript
const SearchInput = require('SearchInput').default;
initialState = { 
    value: ''
};
<SearchInput 
    value={state.value} 
    placeholder="Search" 
    disabled={true}
    onSearch={(value) => {
        setState({ value });
        console.log(`onSearch: ${value}`);
    }}/>
```