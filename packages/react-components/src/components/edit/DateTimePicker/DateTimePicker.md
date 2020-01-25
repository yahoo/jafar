<h3>Examples</h3>

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
        name: 'DateTimePicker',
        state: {
          format: 'MM/dd/yyyy hh:mm'
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
    DateTimePicker: {
      renderer: DateTimePicker,
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
};

 <DateTimePicker
  value={state.value}
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
 <DateTimePicker
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
 <DateTimePicker
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
 <DateTimePicker
  value={state.value}
  invalid={true}
  onValueChange={(value) => {
    setState({ value });
  }}
/>
```
