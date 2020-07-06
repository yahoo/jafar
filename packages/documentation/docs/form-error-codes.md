---
id: error-codes
title: Error Codes
sidebar_label: Error Codes
---

## MISSING_ID

`model.id` is missing. [More info](id)

Example

```javascript
const model = { // id is missing
}
```

Solution

```javascript
const model = {
  id: 'employeeForm'
  // ...
}
```

## MISSING_DATA

`model.data` should be an object. [More info](data)

Example

```javascript
const model = { // data is invalid
  data: []
  // ...
}
```

Solution

```javascript
const model = {
  data: {}
  // ...
}
```

## MISSING_FIELDS

`model.fields` should be an object with at least one field defined. [More info](fields)

Example

```javascript
const model = { // fields is missing
}

const model = { // fields is array (should be a object)
  fields: [{
    id: 'name',
    // ...
  }]
}

const model = { // fields is empty (should be at least one field defined)
  fields: {
  }
}
```

Solution

```javascript
const model = {
  fields: {
    name: {
      // ...
    }
  }
  // ...
}
```

## MISSING_FIELD_PATH

field `fieldId` should define path. [More info](path)

Example

```javascript
const model = {
  fields: {
    name: { // name is missing path
    }
  }
  // ...
}
```

Solution

```javascript
const model = {
  fields: {
    name: {
      path: 'name',
      // ...
    }
  }
  // ...
}
```

## MISSING_COMPONENT

field `fieldId` defined a component, in the model, which do not match the definition in resources object. 
Example: for model.fields.firstName.component = { name: 'InputText' }, define resources.components.InputText = { renderer: MyComponent }. [More info](component)

Example

```javascript
const model = {
  fields: {
    firstName: { 
      component: { 
        name: 'InputText',
      }
    }
  }
};

const resources = {
  components: {
    // missing InputText
  }
};
```

Solution

```javascript
import MyInputComponent from './components/MyInputComponent.jsx';

const model = {
  fields: {
    firstName: { 
      component: { 
        name: 'InputText',
      }
    }
  }
};

const resources = {
  components: {
    InputText: { 
      renderer: MyInputComponent 
    }
  }
};
```

## INVALID_STATE_CHANGE

component `name` defined a stateChange handler, which is not a function. [More info](component#state-change)

Example

```javascript
import AsyncSelect from './components/AsyncSelect'

const model = {
  fields: {
    hobbies: { 
      component: { 
        name: 'AsyncSelect',
      }
    }
  }
};

const resources = {
  components: {
    AsyncSelect: {
      renderer: AsyncSelect,
      stateChange: '', // should be a function (if defined)
    }
  }
};
```

Solution

```javascript
import AsyncSelect from './components/AsyncSelect'

const model = {
  fields: {
    hobbies: { 
      component: { 
        name: 'AsyncSelect',
      }
    }
  }
};

const resources = {
  components: {
    AsyncSelect: {
      renderer: AsyncSelect,
      stateChange: (props) => {
        // ...
      }
    }
  }
};
```

## REDUNDANT_CONVERSION

field `fieldId` defined a `conversionName` named `name` in the model without defining a component. [More info](formatter-parser)

> **Note:** `conversionName` can be `formatter` or `parser`.

Example

```javascript
const model = {
  fields: {
    age: { 
      formatter: { name: 'ageFormatter' },
      // missing component
    }
  }
};
```

Solution

```javascript
const model = {
  fields: {
    age: { 
      component: {  // add a component definition or remove the formatter definition
        name: 'inputNumber',
      },
      formatter: { name: 'ageFormatter' },
    }
  }
};
```

## MISSING_CONVERSION

field `fieldId` defined a `conversionName` named `name` in the model,
which should match a definition in resources object - resources.conversions.name = { func: () => {} }. [More info](formatter-parser)

> **Note:** `conversionName` can be `formatter` or `parser`.

Example

```javascript
const model = {
  fields: {
    age: { 
      component: { 
        name: 'inputNumber',
      },
      formatter: { name: 'ageFormatter' },
    }
  }
};

const resources = {
  conversions: {
    // missing ageFormatter
  }
};
```

Solution

```javascript
const model = {
  fields: {
    age: { 
      component: { 
        name: 'inputNumber',
      }
      formatter: { name: 'ageFormatter' },
    }
  }
};

const resources = {
  conversions: {
    ageFormatter: {
      func: (props) => {
        // ...
      }
    }
  }
};
```

## MISSING_FORMATTER_OR_PARSER

field `fieldId` defined only one of parser or formatter, but for editable component both formatter and parser should be defined.

Example

```javascript
const model = {
  fields: {
    age: { 
      component: { 
        name: 'inputNumber',
      },
      parser: { name: 'ageParser' },
      // missing formatter
    }
  }
  // ...
}
```

Solution

```javascript
const model = {
  fields: {
    age: { 
      component: { 
        name: 'inputNumber',
      },
      parser: { name: 'ageParser' },
      formatter: { name: 'ageFormatter' },
    }
  }
  // ...
}
```

## MISSING_DEPENDENCIES_FIELD

field `fieldId` defined a dependency on field `dependOnField` in dependencies, but `dependOnField` is not defined in model.fields. [More info](dependencies)

Example

```javascript
const model = {
  fields: {
    city: { 
      // ...
      dependencies: ['country'],
    }
    // country field is not defined
  }
  // ...
}
```

Solution

```javascript
const model = {
  fields: {
    city: { 
      // ...
      dependencies: ['country'],
    }
    country: { 
      // ...
    }
  }
  // ...
}
```

## MISSING_DEPENDENCIES_CHANGE

field `fieldId` defined a dependenciesChange, named `name` in the model,
which should match a definition in resources object - resources.dependenciesChanges.name = { func: () => {} }. [More info](dependencies-change)

Example

```javascript
const model = {
  fields: {
    city: { 
      dependencies: ['country'],
      dependenciesChange: { name: 'cityDependenciesChange' },
    },
    country: { 
      // ...
    }
  },
};

const resources = {
  dependenciesChanges: {
    // missing cityDependenciesChange
  },
};
```

Solution

```javascript
const model = {
  fields: {
    city: { 
      dependencies: ['country'],
      dependenciesChange: { name: 'cityDependenciesChange' },
    },
    country: { 
      // ...
    }
  },
};

const resources = {
  dependenciesChanges: {
    cityDependenciesChange: {
      func: (props) => {
        // ...
      }
    }
  }
};
```

## MISSING_VALIDATOR

field `fieldId` defined a validator, named `name` in the model,
which should match a definition in resources object - resources.validators.name = { func, message }.
[More info](validators)

Example

```javascript
const model = {
  fields: {
    name: { 
      // ...
      validators: [{
        name: 'uniqueName',
      }],
    }
  },
};

const resources = {
  validators: {
    // missing uniqueName / missing uniqueName.func / missing uniqueName.message
  },
};
```

Solution

```javascript
const model = {
  fields: {
    name: { 
      // ...
      validators: [{
        name: 'uniqueName',
      }],
    }
  },
};

const resources = {
  validators: {
    uniqueName: {
      func: (props) => {
        // ...
      },
      message: (props) => {
        // ...
      },
    }
  },
};
```

## MISSING_TERM

field `fieldId defined a term in `termsType`, named `name` in the model,
which should match a definition in resources object - resources.termsType.name = { func: () => {} }`
[More info](term)

> **Note:** `termsType` can be `excludeTerm`, `disableTerm` or `requireTerm`.

Example

```javascript
const model = {
  fields: {
    name: { 
      // ...
      excludeTerm: [{
        name: 'myCustomTerm',
      }],
    }
  },
};

const resources = {
  terms: {
    // missing myCustomTerm
  },
};
```

Solution

```javascript
const model = {
  fields: {
    name: { 
      // ...
      excludeTerm: [{
        name: 'myCustomTerm',
      }],
    }
  },
};

const resources = {
  terms: {
    myCustomTerm: {
      func: (props) => {
        // ...
      }
    } 
  }
};
```

## MISSING_HOOKS

`resources.hooks` should be an object. [More info](hooks)

Example

```javascript
const resources = { // hooks is invalid
  hooks: []
  // ...
}
```

Solution

```javascript
const resources = {
  hooks: {}
  // ...
}
```

## INVALID_HOOK

hook `hook` is not supported. [More info](hooks)

Example

```javascript
const resources = { 
  hooks: {
    beforeChangeField: () => {}, // hook is not supported
  }
  // ...
}
```

Solution

```javascript
const resources = {
  hooks: {
    beforeChangeValue: () => {},
  }
  // ...
}
```

## INVALID_SETTING

setting `setting` is invalid. Expected to be `expected`. [More info](arguments#settings)

Example

```javascript
const settings = {
  changeValueDebounceWait: '200',
}
```

Solution

```javascript
const settings = {
  changeValueDebounceWait: 200,
}
```

## INVALID_SUBMIT

can't perform submit when form is invalid. [More info](actions#submitformid)

Example

```javascript
// model.invalid is true

context.actions.submit();
```

Solution

```javascript
// model.invalid is false. You can add a disable condition to your submit function such as 
// <Button disabled={this.context.model.invalid} 
// onClick={() => { await this.context.actions.submit() }}>Submit</Button>

context.actions.submit();
```

## CIRCULAR_DEPENDENCIES

field `fieldId` of form `formId` defined circular dependencies: `dependenciesStr`. [More info](dependencies-change#circular-dependencies)

Meaning: `changeFieldValue` action was called with the same field id and value more than one time in the same field evaluation.


Example

initial values: a=0, b=0, c=0. User changes "a" to 1, causes:

`a=1 -> b=2 -> c=1 -> b=2`

If we will not stop and throw an error we will get infinit loop of:

`a=1 -> b=2 -> c=1 -> b=2 -> c=2 -> b=2 -> c=3 -> b=2 -> c=4 -> b=2 ->.....`

Jafar prefer throw an error rather than stop the loop itself, inorder that the user will know about its circular dependencies definition, and will fix it using an exit code.

```javascript
const model = {
  // ...
  fields: {
    a: {
      // ...
    }, 
    b: {
      // ...
      dependencies: ['a', 'c'],
      dependenciesChange”: 'bDependenciesChange',
    },
    c: {
      // ...
      dependencies: ['b'],
      dependenciesChange”: 'cDependenciesChange',
    }, 
  }, 
};

const resources = {
  dependenciesChanges: {
    bDependenciesChange: {
      func: (props) => ({ value: 2 }),
    },
    cDependenciesChange: {
      func: (props) => ({ value: props.value + 1 }),
    }
  }
};
```

Solution

define an exit case in at least one of the dependenciesChange function.

```javascript
const model = {
  // ...
  fields: {
    a: {
      // ...
    }, 
    b: {
      // ...
      dependencies: ['a', 'c'],
      dependenciesChange”: 'bDependenciesChange',
    },
    c: {
      // ...
      dependencies: ['b'],
      dependenciesChange”: 'cDependenciesChange',
    }, 
  },
};

const resources = {
  dependenciesChanges: {
    bDependenciesChange: {
      func: (props) => ((props.dependencies.a.value < 2 && props.dependencies.c.value < 2) ? { value: 2 } : undefined),
    },
    cDependenciesChange: {
      func: (props) => ({ value: props.value + 1 }),
    },
  }
};
```

## MAX_CIRCULAR_DEPENDENCIES_LOOPS

field `fieldId` of form `formId` has reached maximum circular dependencies loops (`maxChangeValueLoops`): `dependenciesStr`. [More info](dependencies-change#circular-dependencies)

Meaning: `changeFieldValue` action was called with the same field id with different value for `maxChangeValueLoops` times in the same field evaluation, causing a loop that might not end.

Example

```javascript
const model = {
  // ...
  fields: {
    a: {
      // ...
      dependencies: ['b'],
      dependenciesChange”: 'aDependenciesChange',
    }, 
    b: {
      // ...
      dependencies: ['a'],
      dependenciesChange”: 'bDependenciesChange',
    }
  },
};

const resources = {
  dependenciesChanges: {
    aDependenciesChange: {
      func: (props) => ({ value: props.value + 1 }),
    },
    bDependenciesChange: {
      func: (props) => ({ value: props.value + 1 }),
    },
  }
};
```

Solution

define an exit case in at least one of the dependenciesChange function.

- “a” changes
  - triggers “b” to change value (in dependencyChange func return value to change)
    - triggers “a” to change value (in dependencyChange func return value to change)
      - triggers “b” to evaluate (in dependencyChange func return undefined)

a = 0, b = 0. a changes to 1 -> triggers b change to 1 -> triggers a change to 2 -> trigger b to return undefined and not change anything. loop ends.

```javascript
const model = {
  // ...
  fields: {
    a: {
      // ...
      dependencies: ['b'],
      dependenciesChange”: 'aDependenciesChange',
    }, 
    b: {
      // ...
      dependencies: ['a'],
      dependenciesChange”: 'bDependenciesChange',
    }
  }
};

const resources = {
  dependenciesChanges: {
    aDependenciesChange: {
      func: (props) => {
        if (props.dependencies.b.value < 2) {
          return { value: props.value + 1 };
        }
        return undefined; // exit case
      },
    },
    bDependenciesChange: {
      func: (props) => {
        if (props.dependencies.a.value < 2) {
          return { value: props.value + 1 };
        }
        return undefined; // exit case
      },
    },
  }
};
```

## CHANGE_VALUE_UPDATER_NOT_SUPPORTED

calling `changeValue` action with an updater function is not supported for a field without a component. [More info](actions#changevalue)

Example

```javascript
import Form from '@jafar/form';

// define user form
const model = {
  id: 'user-form',
  fields: {
    size: { // size field is missing a component
      path: 'size',
    },
  },
  data: {
    size: { x: 1, y: 1 },
  }
};

// create user form
const form = new Form();
await form.init(model, resources);

// change size field value - with an updater function
await form.changeValue('size', ({ value }) => ({ x: value.x + 1, y: value.y + 1 }));
```

Solution

```javascript
import Form from '@jafar/form';

// define user form
const model = {
  id: 'user-form',
  fields: {
    size: {
      path: 'size',
      component: { // add a component to the field
        name: 'Dimensions',
      },
    },
  },
  data: {
    size: { x: 1, y: 1 },
  }
};

const resources = {
  components: {
    Dimensions: { renderer: Dimensions },
  },
};

// create user form
const form = new Form();
await form.init(model, resources);

// change size field value - with an updater function
await form.changeValue('size', ({ value }) => ({ x: value.x + 1, y: value.y + 1 }));
```

## INVALID_LOG_LEVEL

log level `logLevel` is not supported. Supported log levels are: `debug`, `warn`, `error` and `none`. [More info](log)

Example

```javascript
import { setLogLevel } from '@jafar/core/logger';

setLogLevel('bla');
```

Solution

```javascript
import { setLogLevel, logLevels } from '@jafar/core/logger';

setLogLevel(logLevels.DEBUG);
```

## ACTION_FAILED

action `name` failed. An action fails due to an exception which occurs in one of the supplied resources handlers
such as: validators, terms, conversions, dependenciesChanges, stateChange and hooks.
Look on the sub error for more info. Try to debug your custom handler's code, or verify that parameters
passed to build-in validators are correct with same expected type. [More info](actions).

Example

```javascript
import Form from '@jafar/form';

// define user form
const model = {
  id: 'user-form',
  fields: {
    children: {
      path: 'children',
      validators: [{ name: 'aboveAge', args: { age: 14 } }],
    },
  },
};

const resources = {
  validators: {
    aboveAge: {
      func: ({ value, args }) => {
        return !value.find(x => x.age < args.age); // this with cause an exception when value is undefined
      },
      message: () => 'All children must be above 14.',
    },
  },
};

// create user form
const form = new Form();
await form.init(model, resources);
```

Solution

```javascript
import Form from '@jafar/form';

// define user form
const model = {
  id: 'user-form',
  fields: {
    children: {
      path: 'children',
      validators: [{ name: 'aboveAge', args: { age: 14 } }],
    },
  },
};

const resources = {
  validators: {
    aboveAge: {
      func: ({ value = [], args }) => { // define a default empty array for the expected value
        return !value.find(x => x.age < args.age); 
      },
      message: () => 'All children must be above 14.',
    },
  },
};

// create user form
const form = new Form();
await form.init(model, resources);
```