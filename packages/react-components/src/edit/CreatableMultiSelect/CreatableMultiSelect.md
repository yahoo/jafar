<div class="component-description">Represent creation of dynamic items list</div>
<a class="component-src" target="_blank" href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/CreatableMultiSelect/CreatableMultiSelect.jsx">Source</a>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    keywords: {
      label: 'Keywords',
      path: 'keywords',
      component: {
        name: 'CreatableMultiSelect',
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
      keywords: ['dog', 'cat'], // remove to see initial value undefined, and required error
  }
};

const resources = {
  components: { 
    CreatableMultiSelect: {
      renderer: CreatableMultiSelect,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
    <Field id='keywords' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
  value: ['foo', 'bar'],
};

<CreatableMultiSelect
value={state.value}
state={state.state}
onValueChange={(value) => {
  setState({ value });
}}
/>
```