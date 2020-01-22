---
id: folder-structure
title: Folder Structure
sidebar_label: Folder Structure
---

Large / massive form contains a lot of code and definitions. In order to keep code as simple and intuitive as possible we recommend the following folder structure for a form definition:

- `form`
  - `fields`
    - first-name.js
    - last-name.js
    - friends.js
    - job-type.js
    - index.js
  - `validators`
    - unique-field.js
    - correct-format.js
    - index.js
  - `terms`
    - is-allowed.js
    - index.js
  - `conversions`
    - friends-to-array.js
    - index.js
  - `dependencies-changes`
    - friends-dependencies-changes.js
    - index.js
  - `hooks`
    - after-action.js
    - validate.js
    - submit.js
    - index.js
  - `components`
    - Friends.js
    - index.js
  - data.js
  - index.js

## form/index.js

Aggregates all form's definition into 2 objects - model and resources, and export them.

```javascript
import fields from './fields';
import data from './data';
import validators from './validators';
import terms from './terms';
import conversions from './conversions';
import dependenciesChanges from './dependencies-changes';
import hooks from './hooks';

const model = {
  id: 'employee',
  fields,
  data,
};

const resource = {
  validators,
  terms,
  conversions,
  dependenciesChanges,
  hooks,
};

export default { model, resources };
```

## form/data.js

Exports default / initial data of a form.

```javascript
export default {
  jobType: 'SOFTWARE_ENGINEER',
};
```

## form/fields/index.js

Aggregates all form's [fields](fields) into one object and export it.

```javascript
import firstName from './first-name';
import lastName from './last-name';
import friends from './friends';
import jobType from './job-type';

export default {
  firstName,
  lastName,
  friends,
  jobType,
};
```

## form/validators/index.js

Aggregates all form's custom [validators](validators) into one object and export it. No need to define [built-in validators](validators#built-in-validators)

```javascript
import uniqueField from './unique-field.js';
import correctFormat from './correct-format.js';

export default { 
  uniqueField,
  correctFormat,
};
```

## form/terms/index.js

Aggregates all form's custom [terms](term) into one object and export it. No need to define [built-in terms](term#built-in-terms)

```javascript
import uniqueField from './unique-field.js';
import correctFormat from './correct-format.js';

export default { 
  uniqueField,
  correctFormat,
};
```

## form/conversions/index.js

Aggregates all form's custom [conversions](formatter-parser) into one object and export it. No need to define [built-in conversions](formatter-parser#built-in-conversions)

```javascript
import friendsToArray from './friends-to-array.js';

export default { 
  friendsToArray,
};
```

## form/dependencies-changes/index.js

Aggregates all form's [dependencies changes](dependencies-change) into one object and export it.

```javascript
import friendsToArray from './friends-to-array.js';

export default { 
  friendsToArray,
};
```

## form/hooks/index.js

Aggregates all form's [hooks](formatter-hooks) into one object and export it.

```javascript
import afterAction from './after-action.js';
import validate from './validate.js';
import submit from './submit.js';

export default { 
  afterAction,
  validate,
  submit,
};
```

## form/components/index.js

Aggregates all form's [components](component) into one object and export it.

```javascript
import InputText from '@jafar-org/react-components/edit/Text';
import Select from '@jafar-org/react-components/view/Select';
import Friends from './Friends.js'; // custom component - exports object { renderer, stateChange }

export default { 
  InputText: { 
    renderer: InputText, 
  },
  Select: { 
    renderer: Select, 
  },
  Friends,
};
```