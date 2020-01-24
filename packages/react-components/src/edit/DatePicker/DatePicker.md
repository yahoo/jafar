<div class="component-description">Represent a Date object</div>
<a class="component-src" target="_blank" href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/DatePicker/DatePicker.jsx">Source</a>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    birthDate: {
      label: 'Birth Date',
      path: 'birthDate',
      component: {
        name: 'DatePicker',
        state: {
          format: 'MM/dd/yyyy'
        },
      },
      required: true,
      validators: [{
        name: 'min',
        args: { value: new Date('2019-06-18 09:00') }, // convert the example date before that date to see invalid error
      }],
      disableTerm: {
        name: 'disableMe',
      },
      excludeTerm: {
        name: 'excludeMe',
      },
    },
  },
  data: {
    birthDate: new Date('2019-06-22 09:00'), // remove to see initial value undefined, and required error
  },
};

const resources = {
  components: { 
    DatePicker: {
      renderer: DatePicker,
    }, 
  },
  terms: {
      disableMe: { func: () => false }, // convert to true to see the field disabled
      excludeMe: { func: () => false }, // convert to true to see the field excluded
  },
};

<Form model={model} resources={resources}>
  <Field id='birthDate' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
  value: new Date('2019-04-18 09:00'),
  state: {
    placeholder: 'Enter date',
  }
};

<DatePicker
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
};
 <DatePicker
  value={state.value}
  onValueChange={(value) => {
    setState({ value });
  }}
  />
  ```

  <h4>Disabled</h4>

```javascript
initialState = { 
  value: new Date('2019-04-18 09:00'),
};
 <DatePicker
  value={state.value}
  disabled={true}
  onValueChange={(value) => {
    setState({ value });
  }}
  />
  ```

<h4>Invalid</h4>

```javascript
initialState = { 
  value: new Date('2019-04-18 09:00'),
};
 <DatePicker
  value={state.value}
  invalid={true}
  onValueChange={(value) => {
    setState({ value });
  }}
/>
```
