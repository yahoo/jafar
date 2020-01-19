---
id: require-term
title: Require Term
sidebar_label: Require Term
---

Define require term in a field in order to require it under some certain terms (i.e dynamic change of `required` flag). Form evaluates require term
during its lifecycle, and sets `required` result flag to a field.

## Field Require Term

Requiring a field means that the field must be filled (i.e can't be empty). Field that is both required and empty at a specific point has a `required` error in the field's errors.

### Behavior

Require term result is dynamic, if the field is required at a certain point, it can also be not required if the term was dependant on another field's change. If the field is dependant on another field and is required at the moment, and value changes on the dependent field, dependencies are reevaluated for the other field, and the require term is reevaluated as well. If the field's `required` flag is now false, the field is now not required in the form, and can be empty (meaning no validation is needed).

### Evaluation

Field require term is evaluated on `init`, `changeData`, and `changeValue` (only changed fields and their dependencies are evaluated on a value change) actions.
After evaluation an `required` flag is updated in the field (model.fields.someField.required).

### Definition

To define field require term - a definition is required in the `model.fields.someField` object, and implementation is
required in the `resources.terms` object.

`model.fields.someField.requireTerm` and `resources.terms` objects structures are fully documented in [term documentation page](term).

### Shorthand

Definition shorthand for terms can be found in [definition shorthand documentation](definition-shorthand#terms).


### Built-in terms

A list of built-in terms are fully documented in [term documentation page](term#built-in-terms).

### Example

City field is required if country is not empty.

Term = (country not empty)

```javascript
import { isEmpty } from 'lodash';

const model = {
  // ...
  fields: {
    country: {
      // ...
    },
    city: {
      // ...
      dependencies: ['country'], // define it in ordered that country's value will be injected to the require term func in - prop.dependencies
      requireTerm: {
        not: true,
        name: 'empty',  // logical term
        args: {
          fieldId: 'country',
        }
      }
    }
  }
};

// note - 'empty' is a built-in term - therefor not needed here. 
// We added it here just for the example.
const resources = {
  terms: {
    empty: {
      func: (props) => {
        const dependantFieldValue = props.dependencies[props.args.fieldId];
        return isEmpty(dependantFieldValue, props.args.value);
      }
    }
  }
};
```

