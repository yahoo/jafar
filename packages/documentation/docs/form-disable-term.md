---
id: disable-term
title: Disable Term
sidebar_label: Disable Term
---

Define disable term in a field in order to disable it under some certain terms (i.e dynamic change of `disabled` flag). Form evaluates disable term
during its lifecycle, and sets `disabled` result flag to a field.

## Field Disable Term

Disabling a field means that the field is viewable but not editable. A disable style should be applied to the field to imply it.

### Behavior

Disable term result is dynamic, if the field is disabled at a certain point, it can also be re-enabled if the term was dependant on another field's change. If the field is dependant on another field and is disabled at the moment, and value changes on the dependent field, dependencies are reevaluated for the other field, and the disable term is reevaluated as well. If the field's `disabled` flag is now false, the field is now enabled in the form, and is now editable.

### Evaluation

Field disable term is evaluated on `init`, `changeData`, and `changeValue` (only changed fields and their dependencies are evaluated on a value change) actions.
After evaluation an `disabled` flag is updated in the field (model.fields.someField.disabled).

### Definition

To define field disable term - a definition is required in the `model.fields.someField` object, and implementation is
required in the `resources.terms` object.

`model.fields.someField.disableTerm` and `resources.terms` objects structures are fully documented in [term documentation page](term).

### Shorthand

Definition shorthand for terms can be found in [definition shorthand documentation](definition-shorthand#terms).

### Built-in terms

A list of built-in terms are fully documented in [term documentation page](term#built-in-terms).

### Example

City field is disabled if country is Mexico or Israel.

Term = (country equals `Mexico`) or (country equals `Israel`)

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
      dependencies: ['country'], // define it in ordered that country's value will be injected to the disable term func in - prop.dependencies
      disableTerm: {
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
      }
    }
  }
};

// note - 'equals' is a built-in term - therefor not needed here. 
// We added it here just for the example.
const resources = {
  terms: {
    equals: { 
      func: (props) => {
        const dependantFieldValue = props.dependencies[props.args.fieldId];
        return isEqual(dependantFieldValue, props.args.value);
      }
    },
  }
};
```

