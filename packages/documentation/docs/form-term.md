---
id: term
title: Term
sidebar_label: Term
---

A term is an expression that evaluates to `true` / `false`.

Example:

```javascript
(!isUserPermitted) and ((name equals `Rachel`) or (name equals `Monica`))
```

This term is truthy if a user is not permitted to that field and if field `name` value equals `'Rachel'` or `'Monica'`.

A term definition and evaluation is used by the form in several parts (such as [excludeTerm](exclude-term), [disableTerm](disable-term) and [requireTerm](require-term)), in order to evaluate field's flags results.

Example - if you want to exclude a city field from the form's lifecycle, when the `country` field has no value - define `excludeTerm` to the field.

## Field Term

To define a field term - a definition is required in the `model.fields.someField` object, and implementation is required in the `resources.terms` object.

### Model

`model.fields.someField.someTerm` - object - describes a logical regular expression. 

Field term is represented by a tree object. A tree node (term) can be one of [Conditional term](term#conditional-term-object) or [Logical term](term#logical-term-object):

#### Conditional term object

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| operator | required string | Values can be one of:  `'and'` / `'or'` |
| terms | required array | Array of terms object (each object can be 'conditional term' or 'logical term' - see below) |
| not | boolean | If true - the returned value `result` of the conditional term will become `!result` |

#### Logical term object

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| name | required string | Represent a key in [resources.terms](term#resources) object that this term applies to |
| args | object | Custom arguments that the term function gets |
| not | boolean | If true - logical term returns inverted result |

> **Note:** If a term object contains `operator` - then it is a conditional term. Otherwise we treat it as logical term.

### Resources

`resources.terms` - object. Required only if [model.fields.someField.someTerm](term.html#model) is defined.
Key is the term name, and value is an object that contains: 

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| func | required function | Returns term evaluation result (true / false). Function can be `sync` or `async` function (that resolves to a boolean value). [More info](term#func) | 
| defaultArgs | object | Default args for all fields. This will be shallow merged with field level conversion `args` before passed to the `func` | 

#### func

```
function ({ 
  id, 
  value,  
  dependencies { id: { value } },
  args,
  context,
})
```

`return value` - boolean. `true` is pass term, otherwise - `false`.

### Example

`excludeTerm` is used for this example.

City field is excluded if user is not permitted and country is Mexico or Israel.

Term = (!isUserPermitted) and ((country equals `Mexico`) or (country equals `Israel`))

```javascript
import { isEqual } from 'lodash';

const model = {
  // ...
  fields: {
    country: {
      // ...
    },
    city: {
      // ...
      dependencies: ['country'], // define it in ordered that country's value will be injected to the exclude term func in - prop.dependencies
      excludeTerm: {
        operator: 'and', // conditional term
        terms: [{
          name: 'isUserPermitted', // logical term
          not: true
        }, {
          operator: 'or', // conditional term
          terms: [{
            name: 'equals', // logical term
            args: {
              fieldId: 'country',
              value: 'Mexico',
            }
          }, {
            name: 'equals',  // logical term
            args: {
              fieldId: 'country',
              value: 'Israel',
            }
          }]
        }],
      },
    }
  },
};

// note - 'equals' is a built-in term - therefor not needed here. 
// We added it here just for the example.
const resources = {
  terms: {
    isUserPermitted: {
      func: (props) => {
        let isUserPermitted;
        // ....
        return isUserPermitted;
      },
    },
    equals: {
      func: (props) => {
        const dependantFieldValue = props.dependencies[props.args.fieldId];
        return isEqual(dependantFieldValue, props.args.value);
      },
    }
  }
};
```
### Shorthand

Definition shorthand for terms can be found in [definition shorthand documentation](definition-shorthand#terms).

## Built-in Terms

Jafar also defines built-in terms: `'equals', 'lowerThan'` and so on. 
Built-in terms in `resources.terms` object work out of the box, there's no need to define them in `resources.terms`.
Jafar extends custom terms object (from `resources.terms`) with the built-in terms object.

- Define `resources.terms` object with custom term that is not part of Jafar's built-in terms:

Example
```javascript
const model = {
  // ...
  fields: {
    // ...
    name: {
      // ...
      excludeTerm :{
        name: 'isUserPermitted',
        not: true
      }
    }
  },
};

const resources = {
  terms: {
    isUserPermitted: {
      func: (props) => {
        let isUserPermitted;
        // ....
        return isUserPermitted;,
      }
    },
  }
}
```

- Define `field.excludeTerm` term that is part of the built-in terms:

Example
```javascript
const model = {
  // ...
  fields: {
    // ...
    country: {
      // ...
    },
    city: {
      // ...
      dependencies: ['country'],
      excludeTerm :{ // exclude city if country not exists
        name: 'exists',
        not: true,
        args: {
          fieldId: 'country'
        }
      }
    }
  },
}

// no need to define resources.terms
```

- Define a field's excludeTerm that is one of Jafar's built-in terms and also define it in `resources.terms` object in order to override the built-in function behavior (you can also define a custom override for only some of: func / defaultArgs)

Example
```javascript
const model = {
  // ...
  fields: {
    // ...
    country: {
      // ...
    },
    city: {
      // ...
      dependencies: ['country'],
      excludeTerm :{ // exclude city if country not exists
        name: 'exists',
        not: true,
        args: {
          fieldId: 'country'
        }
      }
    }
  }
};

const resources = {
  terms: {
    exists: {
      func: props => props.dependencies[props.args.fieldId] !== undefined,
    }
  }
};
```

The following are Jafar's built-in terms and their usage:

### empty

Verify if dependency field's `value` considered empty.

Return `true` for: `undefined`, `null`, `{}`, `[]`, `''`. Otherwise `false`.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |

Example:

`meetingTime` excluded if: `meetingMembers` is empty

```javascript
// model.fields.meetingTime
dependencies: ['meetingMembers'],
excludeTerm: {
  name: 'empty',
  args: {
    fieldId: 'meetingMembers',
  }
}
```

> **Note:** `empty` term calls [isEmpty](hooks#isempty) hook. This hook is also called from other parts of the form's lifecycle. So in order to keep form integrity (i.e field is considered empty in all lifecycle parts the same way), you should only override this hook instead of the `empty` term.
>
> Example:
> - `isEmpty` default implementation return true when value is `''` (empty string) among others.
> - Only `empty` term is overridden to a different logic than `isEmpty` hook - only `undefined` considered empty.
> - `Country` field value is `''` - therefor is required and empty (i.e a "required" error message appears)
> - `City` field has defined excludeTerm to be excluded when `Country` is empty.
> - Result: `City` is not excluded even though `Country` is empty.

### exists

Verify if dependency's field `value` exists.

Return `true` for: `undefined`, `null`. Otherwise `false`.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |

Example: 

`city` excluded if: `country` doesn't exist

```javascript
// model.fields.city
dependencies: ['country'],
excludeTerm: {
  name: 'exists',
  not: true,
  args: {
    fieldId: 'country',
  }
}
```

### equals

Verify if dependency field's `value` equals to args.value. (performs abstract comparisons).

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example:

`seasonNumber` excluded if: `contentType` doesn't equal 'SERIES'

```javascript
// model.fields.seasonNumber
dependencies: ['contentType'],
excludeTerm: {
  name: 'equals',
  not: true,
  args: {
    fieldId: 'contentType',
    value: 'SERIES',
  }
}
```

### lowerThan

Verify if dependency field's `value` lower than args.value.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example:

`adultsContent` excluded if: `age` is lower than 18

```javascript
// model.fields.adultsContent
dependencies: ['age'],
excludeTerm: {
  name: 'lowerThan',
  args: {
    fieldId: 'age',
    value: 18,
  }
}
```

`lowerThan` is truthy if `args.fieldId`'s value is less than `args.value`

### lowerThanOrEquals

Verify if dependency field's `value` lower than or equals to args.value.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example:

`adultsContent` excluded if: `age` is lower than or equals 18

```javascript
// model.fields.adultsContent
dependencies: ['age'],
excludeTerm: {
  name: 'lowerThanOrEquals',
  args: {
    fieldId: 'age',
    value: 18,
  }
}
```

`lowerThanOrEquals` is truthy if `args.fieldId`'s value is lower than or equals to `args.value`

### greaterThan

Verify if dependency field's `value` greater than args.value.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example: 

'kidsContent' excluded if: 'age' is greater than 18

```javascript
// model.fields.kidsContent
dependencies: ['age'],
excludeTerm: {
  name: 'greaterThan',
  args: {
    fieldId: 'age',
    value: 18,
  }
}
```

`greaterThan` is truthy if `args.fieldId`'s value is more than `args.value`

### greaterThanOrEquals

Verify if dependency field's `value` greater than or equals to args.value.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example:

'kidsContent' excluded if: 'age' is greater than or equals 18

```javascript
// model.fields.kidsContent
dependencies: ['age'],
excludeTerm: {
  name: 'greaterThanOrEquals',
  args: {
    fieldId: 'age',
    value: 18,
  }
}
```

`greaterThanOrEquals` is truthy if `args.fieldId`'s value is greater than or equals to `args.value`

### equalsOne

Verify if dependency field's `value` equals to one of the values in args.value.

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | array | []  | Compared to dependency's field value |

Example:

`secondaryColor` excluded if: '`color` equals to one of these values: `["GREEN", "BLUE", "BLACK"]`. (color field is a string value)

```javascript
// model.fields.secondaryColor
dependencies: ['color'],
excludeTerm: {
  name: 'equalsOne',
  args: {
    fieldId: 'color',
    value: ["GREEN", "BLUE", "BLACK"],
  }
}
```

`equalsOne` performs abstract comparisons, meaning `args.value` can be array of any type of object. 

### includes

Verify if dependency field's `value` includes `args.value` (performs abstract comparisons, meaning `args.value` can be any objects).

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | any | undefined  | Compared to dependency's field value |

Example:

`secondaryColor` excluded if: `colors` includes `"GREEN"`. (colors field is a string array value)

```javascript
// model.fields.secondaryColor
dependencies: ['colors'],
excludeTerm: {
  name: 'includes',
  args: {
    fieldId: 'colors',
    value: "GREEN",
  }
}
```

### includesAll

Verify if dependency field's `value` includes all of the values in args.value (performs abstract comparisons, meaning `args.value` can be array of any objects).

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | array | []  | Compared to dependency's field value |

Example:

`secondaryColor` excluded if: `colors` includes all of the following values: `["GREEN", "BLUE", "BLACK"]`. (colors field is a string array value)

```javascript
// model.fields.secondaryColor
dependencies: ['colors'],
excludeTerm: {
  name: 'includesAll',
  args: {
    fieldId: 'colors',
    value: ["GREEN", "BLUE", "BLACK"],
  }
}
```

### includesOne

Verify if dependency field's `value` includes at least one of the values in args.value (performs abstract comparisons, meaning `args.value` can be array of any objects).

Default args:

| Name          | Type          | Default | Description |
| ------------- |-------------|------------|------------|
| fieldId | string | undefined  | Dependency field id |
| contextId | string | undefined  | Dependency context id |
| value | array | []  | Compared to dependency's field value |

Example:
`secondaryColor` excluded if: `colors` includes any of these values: `["GREEN", "BLUE", "BLACK"]`. (colors field is a string array field)

```javascript
// model.fields.secondaryColor
dependencies: ['colors'],
excludeTerm: {
  name: 'includesOne',
  args: {
    fieldId: 'colors',
    value: ["GREEN", "BLUE", "BLACK"],
  }
}
```