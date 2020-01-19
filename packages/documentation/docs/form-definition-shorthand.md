---
id: definition-shorthand
title: Definition Shorthand
sidebar_label: Definition Shorthand
---

 Form's model & resources objects are very descriptive, making a lot of definitions be defined by `object`s to allow more current / future sub definitions expandable. 

 For example - a field formatter definition is an object which contains the `name` of the formatter resource, and optional `args` object.

 ```javascript
 birthDate.formatter = { name: 'join', args: { separator: ';' }  }
 ```

 Sometimes, only the `name` is defined, making the definition be larger with no good reason.

 ```javascript
 birthDate.formatter = { name: 'toDate' }
 ```

For these and more cases Jafar offers a `definition shorthand`, allowing shorter model and resources objects to be defined and passed to the Form.
Internally, we first transpile the given model and resources to their expanded structures, and store / manage the form using the expanded structures (to avoid a lot of `if-else` in the code and potential bugs). This means that all places which expose model and resources do it with the expanded (transpiled) objects (such as hooks that pass model and resources to the hook handlers).

The following sections list and demonstrate the available shorthand for form definition.

## Components

Optional shorthand for components:

1. Define field's component as a `string`

```javascript
// shorthand
model.fields.firstName.component = 'InputText'; 

// transpiles to
model.fields.firstName.component = { name: 'InputText' }; 
```

2. Define component resource as a `function`

```javascript
const Greeting = ({ value }) => `Hi ${value}`;

// shorthand
resources.components.Greeting = Greeting;

// transpiles to
resources.components.Greeting = { renderer: Greeting };
```

3. Define field's component as a `function`. In this case there is no need to have a definition in the resources object.

```javascript
const Greeting = ({ value }) => `Hi ${value}`;

// shorthand
model.fields.firstName.component = Greeting;

// transpiles to
model.fields.firstName.component = { name: 'component1' };
resources.components.component1 = { renderer: Greeting }; 
```

## Formatters Parsers

Optional shorthand for formatters / parsers:

1. Define field's formatter as a `string`

```javascript
// shorthand
model.fields.birthDate.formatter = 'toDate'; 

// transpiles to
model.fields.birthDate.formatter = { name: 'toDate' }; 
```

2. Define formatter resource as a `function`

```javascript
const addPrefix = ({ value }) => `Hi ${value}`;

// shorthand
resources.conversions.addPrefix = addPrefix;

// transpiles to
resources.conversions.addPrefix = { func: addPrefix };
```

3. Define field's formatter as a `function`. In this case there is no need to have a definition in the resources object.

```javascript
const addPrefix = ({ value }) => `Hi ${value}`;

// shorthand
model.fields.birthDate.formatter = addPrefix;

// transpiles to
model.fields.birthDate.formatter = { name: 'formatter1' };
resources.conversions.formatter1 = { func: addPrefix }; 
```

## Dependencies Change

Optional shorthand for dependencies change:

1. Define field's dependenciesChange as a `string`

```javascript
// shorthand
model.fields.city.dependenciesChange = 'handleCountryChange'; 

// transpiles to
model.fields.city.dependenciesChange = { name: 'handleCountryChange' }; 
```

2. Define dependenciesChange resource as a `function`

```javascript
const handleCountryChange = () => {};

// shorthand
resources.conversions.handleCountryChange = handleCountryChange;

// transpiles to
resources.conversions.handleCountryChange = { func: handleCountryChange };
```

3. Define field's dependenciesChange as a `function`. In this case there is no need to have a definition in the resources object.

```javascript
const handleCountryChange = () => {};

// shorthand
model.fields.city.dependenciesChange = handleCountryChange;

// transpiles to
model.fields.city.dependenciesChange = { name: 'dependenciesChange1' };
resources.conversions.dependenciesChange1 = { func: handleCountryChange }; 
```

## Validators

Optional shorthand for validators:

1. Define field's validator (in the validators array) as a `string`

```javascript
// shorthand
model.fields.firstName.validators = ['unique']; 

// transpiles to
model.fields.firstName.validators = [{ name: 'unique' }]; 
```

2. Define validator resource as a `function`

```javascript
const unique = () => {};

// shorthand
resources.validators.unique = unique;

// transpiles to
resources.validators.unique = { func: unique };
```

3. Define field's validator as a `function`. In this case there is no need to have a definition in the resources object.

```javascript
const unique = () => {};

// shorthand
model.fields.firstName.validators = [unique];

// transpiles to
model.fields.firstName.validators = { name: 'validator1' };
resources.validators.validator1 = { func: unique }; 
```

## Terms

Optional shorthand for terms (excludeTerms / disableTerms / requireTerms):

1. Define field's [logical term](term#logical-term-object) as a `string`

```javascript
// shorthand
model.fields.firstName.disableTerm = 'isNotAllowed'; 
model.fields.lastName.disableTerm = { // conditional term
  operator: 'or', 
  terms: [
    'isNotAllowed', // logical term
    { name: 'empty', args: { fieldId: 'firstName' } } // logical term
  ],
};

// transpiles to
model.fields.firstName.disableTerm = { name: 'isNotAllowed' }; 
model.fields.lastName.disableTerm = { 
  operator: 'or',
  terms: [
    { name: 'isNotAllowed' }
    { name: 'empty', args: { fieldId: 'firstName' } }
  ],
};
```

2. Define term resource as a `function`

```javascript
const isNotAllowed = () => {};

// shorthand
resources.terms.isNotAllowed = isNotAllowed;

// transpiles to
resources.terms.isNotAllowed = { func: isNotAllowed };
```

3. Define field's term [logical term](term#logical-term-object) as a `function`. In this case there is no need to have a definition in the resources object.

```javascript
const isNotAllowed = () => {};

// shorthand
model.fields.firstName.disableTerm = isNotAllowed;

// transpiles to
model.fields.firstName.disableTerm = { name: 'term1' };
resources.terms.term1 = { func: isNotAllowed }; 
```