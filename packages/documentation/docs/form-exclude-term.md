---
id: exclude-term
title: Exclude Term
sidebar_label: Exclude Term
---

Define exclude term in a field in order to exclude it under some certain terms (i.e dynamic change of `excluded` flag). Form evaluates exclude term
during its lifecycle, and sets `excluded` result flag to a field.

## Field Exclude Term

Excluding a field means that the field is not rendered in the html and is not supposed to be part of the form validations under specific terms (for instance, if the user is not permitted to see / edit this field). 
If the field is excluded - field validations are not evaluated, field.errors initiates to an empty array, and field.disabled is false.

### Behavior

Exclude term result is dynamic, if the field is excluded at a certain point, it can also be re-rendered if the term was dependant on another field's change. If the field is dependant on another field and is not rendered at the moment, and value changes on the dependent field, dependencies are reevaluated for the other field, and the exclude term is reevaluated as well. If the field's `excluded` flag is now false, the field is now included in the form, and is now rendered, and re-evaluated in terms of validations and disable term.

### Evaluation

Field exclude term is evaluated on `init`, `changeData`, and `changeValue` (only changed fields and their dependencies are evaluated on a value change) actions.
After evaluation an `excluded` flag is updated in the field (model.fields.someField.excluded).

### Definition

To define field exclude term - a definition is required in the `model.fields.someField` object, and implementation is
required in the `resources.terms` object.

`model.fields.someField.excludeTerm` and `resources.terms` objects structures are fully documented in [term documentation page](term).

### Shorthand

Definition shorthand for terms can be found in [definition shorthand documentation](definition-shorthand#terms).

### Built-in terms

A list of built-in terms are fully documented in [term documentation page](term#built-in-terms).

### Example

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
      }
    }
  }
};
```

