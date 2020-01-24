<div class="component-description">Represent a boolean value</div>
<a class="component-src" target="_blank" href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/view/Boolean/Boolean.jsx">Source</a>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

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
