<h3>Examples</h3>

<h4>Usage in jafar form</h4>

```javascript
const Form = require('@jafar-org/react-form/Form').default;
const Field = require('@jafar-org/react-form/Field').default;

const model = {
  id: 'simple',
  fields: {
    facebookUrl: {
      label: 'Facebook Url',
      path: 'facebookUrl',
      component: {
        name: 'Url',
      },
      validators: [{
        name: 'url',
      }],
    },
  },
  data: {
    facebookUrl: 'https://www.facebook.com/friends.tv/',
  },
};

const resources = {
  components: { 
    Url: {
      renderer: Url,
    },
  }
};

<Form model={model} resources={resources}>
    <Field id='facebookUrl' />
</Form>
```

<h4>Simple</h4>

```javascript
initialState = { 
    value: 'https://www.facebook.com/friends.tv/'
};

<Url value={state.value} />
```

<h4>With label and target</h4>

```javascript
initialState = { 
    value: 'https://www.facebook.com/friends.tv/',
    state: {
        label: 'Friends facebook page',
        target: '_self',
    }
};

<Url value={state.value} state={state.state} />
```

<h4>Max lines</h4>

```javascript
initialState = { 
    value: 'https://www.facebook.com/friends.tv/aslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefoaslkfmalkaslfksjflwfjlsfjwefijcsiefjwoiejfwoeifjweoifjwefiojweofijwefijwefo',
    state: {
        maxLines: 3,
    }
};

<Url value={state.value} state={state.state} />
```
