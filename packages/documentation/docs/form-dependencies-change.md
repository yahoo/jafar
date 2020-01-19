---
id: dependencies-change
title: Dependencies Change
sidebar_label: Dependencies Change
---

Define dependencies change for a field, in order to change its value / state when another field has changed its value.

## Field Dependencies Change

Field dependencies change function is evaluated on init and when each of its dependencies fields value changed.
To define field dependency change - a definition is required in the `model.fields.someField` object, and implementation is
required in the `resources.dependenciesChanges` object.

### Model

`model.fields.someField.dependenciesChange` - object. Contains:

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| name | required string | Represents the key in [resources.dependenciesChanges](dependencies-change#resources) object |
| args | object | Custom data to pass to the dependencies change function |

### Resources

`resources.dependenciesChanges` - dependenciesChanges. Required only if [model.fields.someField.dependenciesChange](dependencies-change#model) defined. 
Key is the dependenciesChange name, and value is an object that contains: 

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| func | required function | Evaluates on each field’s dependencies value change. Function can be `sync` or `async` function (that resolves to the return value). [More info](dependencies-change#func) | 
| defaultArgs | object | Default args for all fields. This will be shallow merged with field level conversion `args` before passed to the `func` | 

#### func

```
function ({ 
  id, 
  value, 
  state, 
  dependencies { id: { value } },
  prevDependencies { id: { value } },
  args,
  context,
})
```

`return value` - object. Object defines which changes should be applied to the current field. Contains one or both of:
1. value - the new value of that field
2. state - the new state of that field

The function can also return `undefined` - in that case, the field value / state remains the same.

After the function completes, and the field is evaluated again (excludeTerm, validators and disableTerm), so even if the function doesn't change anything (returned undefined), the field is still evaluated again.

### Example

Each time 'country' changes - 'city' value is initiated to the country's capital city, and state's items are replaces to the country's cities.

```javascript
/* 
countryToCities - object like { 
  ISRAEL: [{ label: 'Jerusalem', value: 'JERUSALEM', capital: true }, { label: 'Tel Aviv', value: 'TEL_AVIV', }],
  MEXICO: [{ label: 'Mexico City', value: 'MEXICO_CITY', capital: true }, { label: 'Cancun', value: 'CANCUN', }],
}
*/
import { countryToCities } from './consts'; 

const model = {
  // ...
  fields: {
    country: {
      // ...
    }.
    city: {
      // ...
      dependencies: ['country']
      dependenciesChange: { name: 'cityDependenciesChange' }, 
    }
  },
  data: { country: 'ISRAEL', city: 'TEL_AVIV' },
};

const resources = {
  dependenciesChanges: {
    cityDependenciesChange: {
      func: (props) => {
        if (props.prevDependencies && 
          (props.dependencies.country.value !== props.prevDependencies.country.value)) {
          const cities = countryToCities[props.dependencies.country.value];
          
          return {
            value: cities.find(city => city.capital).value,
            state: { ...props.state, items: cities },
          };
        }

        return undefined; // no changes needed
      }
    }
  }
};
```

### Shorthand

Definition shorthand for dependencies changes can be found in [definition shorthand documentation](definition-shorthand#dependencies-change).

### Circular Dependencies

1. Circular dependencies can happen only if these 4 conditions apply simultaneously: 
- Field “b” defines a dependency for field “a” (field.dependencies = [‘a’]) 
- Field “a” defines a dependency for field “b” (field.dependencies = [‘b’]) 
- Field “b” defines a “field.dependenciesChange” func that returns “value” change in every case
- Field “a” defines a “field.dependenciesChange” func that returns “value” change in every case

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
        func: (props) => ({ value: props.dependencies.b.value + 1 }),
    },
    bDependenciesChange: {
      func: (props) => ({ value: props.dependencies.a.value + 1 }),
    },
  }
}
```

2. Circular dependencies can happen also on a larger chain(`a -> b -> c -> d -> a`)

3. There are also non circular cases like:
- “a” changes
  - triggers “b” to change value (in dependencyChange func return value to change)
    - triggers “a” to change value (in dependencyChange func return value to change)
      - triggers “b” to evaluate (in dependencyChange func return undefined)

Example

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
  },
};

const resources = {
  dependenciesChanges: {
    aDependenciesChange: {
      func: (props) => (props.dependencies.b.value < 2 ? { value: props.value + 1 } : undefined);
    },
    bDependenciesChange: {
      func: (props) => (props.dependencies.a.value < 2 ? ),
    },
  }
};
```