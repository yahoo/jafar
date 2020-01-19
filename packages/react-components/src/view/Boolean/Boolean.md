<h3>Represent a boolean value</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    canEdit: {
      label: 'Can Edit',
      path: 'canEdit',
      component: {
        name: 'Boolean',
      }
    },
  },
  data: {
      canEdit: true,
  },
};

const resources = {
  components: { 
    Boolean: {
        renderer: Boolean,
    }, 
  }
};

<Form model={model} resources={resources}>
    <Field id='canEdit' />
</Form>
```

<h4>Value: true</h4>

```javascript
initialState = { 
    value: true
};

<Boolean value={state.value} />
```

<h4>Value: false</h4>

```javascript
initialState = { 
    value: false
};

<Boolean value={state.value} />
```

<h4>Value: undefined</h4>

```javascript
initialState = { 
    value: undefined
};

<Boolean value={state.value} />
```
