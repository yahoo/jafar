/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
 isFormInvalid, isFormDirty, isFieldDirty, evaluateTerm, validateField, getDependentFieldsIds, getDependenciesChangeResult,
 getFieldComponentStateChanges, getFieldFormattedValue, getFieldParsedValue, getFormErrors, evaluateValue,  evaluateState,
} from '../src/utils';

describe('utils', () => {
  let model;
  let resources;

  beforeEach(() => {
    model = {
      fields: {
        name: {
          path: 'name',
          component: { name: 'inputText' },
          excludeTerm: { name: 'myCustomTerm' },
          required: true,
          invalid: false,
          validators: [{ name: 'minLength2' }, { name: 'uniqueName' }],
          errors: [],
        },
        lastName: {
          path: 'lastName',
          component: {
            name: 'inputTextLast',
            state: {},
            stateChange: { name: 'lastNameStateChange' },
          },
          formatter: { name: 'lastNameFormatter' },
          parser: { name: 'lastNameParser' },
          required: false,
          invalid: false,
          dependencies: ['name'],
          dependenciesChange: { name: 'lastNameDependenciesChange' },
          errors: [],
        },
      },
      data: { name: 'Rachel', lastName: 'Green' },
      initializedData: { name: 'Rachel', lastName: 'Green' },
      prevData: { name: 'Rache', lastName: 'Green' },
    };

    resources = {
      components: {
        inputText: {
          renderer: () => {},
        },
        inputTextLast: {
          renderer: () => {},
          stateChange: () => ({ placeholder: 'Enter Last Name' }),
        },
      },
      terms: {
        myCustomTerm: { func: () => true },
      },
      validators: {
        minLength2: {
          func: ({ value }) => (value || '').length >= 2,
          message: () => 'Min Length is 2',
        },
        uniqueName: {
          func: () => new Promise((resolve) => {
            setTimeout(() => { resolve(true); });
          }),
          message: () => 'Name not unique',
        },
      },
      dependenciesChanges: {
        lastNameDependenciesChange: {
          func: () => ({ value: 'Geller' }),
        },
      },
      conversions: {
        lastNameFormatter: { func: props => `Formatted ${props.value}` },
        lastNameParser: { func: props => props.value.slice(10) }, // remove 'Formatted ' prefix
      },
    };
  });

  describe('evaluateValue', () => {
    it('value is object', () => {
      model.fields.name.component.value = 1;
      const valueObj = 2;
      const result = evaluateValue('name', model, valueObj);
      expect(result).toEqual(valueObj);
    });
   
    it('value is undefined', () => {
      model.fields.name.component.value = 1;
      const valueObj = undefined;
      const result = evaluateValue('name', model, valueObj);
      expect(result).toEqual(valueObj);
    });

    it('value is function', () => {
      model.fields.name.component.value = 1;
      const valueUpdater = ({ value }) => (value + 1);
      const result = evaluateValue('name', model, valueUpdater);
      expect(result).toEqual(2);
    });
  });

  describe('evaluateState', () => {
    it('state is object', () => {
      model.fields.name.component.state = { num: 1 };
      const stateObj = { num: 2 };
      const result = evaluateState('name', model, stateObj);
      expect(result).toEqual(stateObj);
    });
   
    it('state is undefined', () => {
      model.fields.name.component.state = { num: 1 };
      const stateObj = undefined;
      const result = evaluateState('name', model, stateObj);
      expect(result).toEqual(stateObj);
    });

    it('state is function', () => {
      model.fields.name.component.state = { num: 1 };
      const stateUpdater = ({ state }) => ({ num: state.num + 1 });
      const result = evaluateState('name', model, stateUpdater);
      expect(result).toEqual({ num: 2 });
    });
  });

  describe('isFormDirty', () => {
    it('form is not dirty', () => {
      const dirty = isFormDirty(model);
      expect(dirty).toBeFalsy();
    });
    it('form is dirty', () => {
      model.fields.name.dirty = true;
      const dirty = isFormDirty(model);
      expect(dirty).toBeTruthy();
    });
  });

  describe('isFieldDirty', () => {
    it('field is not dirty', () => {
      const dirty = isFieldDirty('name', model);
      expect(dirty).toBeFalsy();
    });
    it('field is dirty', () => {
      model.data.name = 'test';
      const dirty = isFieldDirty('name', model);
      expect(dirty).toBeTruthy();
    });
  });

  describe('getFormErrors', () => {
    it('There are errors - take only from un excluded fields', () => {
      const err = [{ name: 'min', message: 'minimum 3' }];
      model.fields.name.errors = err;
      model.fields.lastName.errors = err;
      model.fields.lastName.excluded = true;
      const errors = getFormErrors(model);
      expect(errors).toEqual({ name: err });
    });

    it('There are no errors', () => {
      const errors = getFormErrors(model);
      expect(errors).toEqual({});
    });
  });

  describe('isFormInvalid', () => {
    it('invalid', () => {
      model.fields.name.invalid = true;
      const invalid = isFormInvalid(model);
      expect(invalid).toBeTruthy();
    });

    it('valid', () => {
      const invalid = isFormInvalid(model);
      expect(invalid).toBeFalsy();
    });
  });

  describe('evaluateTerm', () => {
    it('term not exists - resolve to flag value', async () => {
      const result = await evaluateTerm('name', model, resources, 'requireTerm', 'required');
      expect(result).toBeTruthy();
    });

    it('pass term', async () => {
      const result = await evaluateTerm('name', model, resources, 'excludeTerm', 'excluded');
      expect(result).toBeTruthy();
    });

    it('not pass term', async () => {
      resources.terms.myCustomTerm = { func: () => false };
      const result = await evaluateTerm('name', model, resources, 'excludeTerm', 'excluded');
      expect(result).toBeFalsy();
    });
  });

  describe('validateField', () => {
    it('field with validators, required, empty', async () => {
      delete model.data.name;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ name: 'required', message: 'Field required' }],
        required: true,
        invalid: true,
        empty: true,
      });
    });

    it('field with validators, not required, empty', async () => {
      delete model.data.name;
      model.fields.name.required = false;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [], 
        required: false, 
        invalid: false, 
        empty: true,
      });
    });

    it('field with validators, required, not empty (valid value)', async () => {
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [], 
        required: true, 
        invalid: false, 
        empty: false,
      });
    });

    it('field with validators, required, not empty (not valid value)', async () => {
      model.data.name = 'a';
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 2', name: 'minLength2' }],
        required: true,
        invalid: true,
        empty: false,
      });
    });

    it('field with validators, not required, not empty (valid value)', async () => {
      model.fields.name.required = false;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [], 
        required: false, 
        invalid: false, 
        empty: false,
      });
    });

    it('field with validators, not required, not empty (not valid value)', async () => {
      model.fields.name.required = false;
      model.data.name = 'a';
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 2', name: 'minLength2' }],
        required: false,
        invalid: true,
        empty: false,
      });
    });

    it('field without validators, not required', async () => {
      const result = await validateField('lastName', model, resources);
      expect(result).toEqual({
        errors: [], 
        required: false, 
        empty: false, 
        invalid: false,
      });
    });

    it('field invalid - on sync func', async () => {
      resources.validators.minLength2.func = () => false;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 2', name: 'minLength2' }],
        required: true,
        empty: false,
        invalid: true,
      });
    });

    it('field invalid - on async func', async () => {
      resources.validators.uniqueName.func = () => new Promise((resolve) => {
        setTimeout(() => { resolve(false); });
      });
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Name not unique', name: 'uniqueName' }],
        required: true,
        empty: false,
        invalid: true,
      });
    });

    it('field invalid - return object result without dynamic args', async () => {
      resources.validators.minLength2.func = () => ({ valid: false });
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 2', name: 'minLength2' }],
        required: true,
        empty: false,
        invalid: true,
      });
    });

    it('field invalid - return object result with field args, defaultArgs and dynamic args', async () => {
      model.fields.name.validators.find(x => x.name === 'minLength2').args = { value: 4 };
      resources.validators.minLength2.defaultArgs = () => ({ value: 3 });
      resources.validators.minLength2.func = () => ({ valid: false, args: { a: 1 } });
      resources.validators.minLength2.message = ({ args }) => `Min Length is ${args.value}, a: ${args.a}`;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 4, a: 1', name: 'minLength2' }],
        required: true,
        empty: false,
        invalid: true,
      });
    });

    it('field invalid - return object result with defaultArgs and dynamic args', async () => {
      resources.validators.minLength2.defaultArgs = { value: 3 };
      resources.validators.minLength2.func = () => ({ valid: false, args: { a: 1 } });
      resources.validators.minLength2.message = ({ args }) => `Min Length is ${args.value}, a: ${args.a}`;
      const result = await validateField('name', model, resources);
      expect(result).toEqual({
        errors: [{ message: 'Min Length is 3, a: 1', name: 'minLength2' }],
        required: true,
        empty: false,
        invalid: true,
      });
    });
  });

  describe('getDependentFieldsIds', () => {
    it('no dependencies', () => {
      const result = getDependentFieldsIds('name', model);
      expect(result).toEqual(['lastName']);
    });

    it('has dependencies', () => {
      const result = getDependentFieldsIds('lastName', model);
      expect(result).toEqual([]);
    });
  });

  describe('getDependenciesChangeResult', () => {
    it('dependencies equals prevDependencies', async () => {
      model.prevData.name = 'Rachel';
      const result = await getDependenciesChangeResult('lastName', model, resources);
      expect(result).toEqual(null);
    });

    it('dependenciesChange - field has no dependenciesChange defined', async () => {
      model.fields.lastName.dependenciesChange = undefined;
      const result = await getDependenciesChangeResult('lastName', model, resources);
      expect(result).toEqual(undefined);
    });

    it('dependenciesChange - is sync function', async () => {
      const result = await getDependenciesChangeResult('lastName', model, resources);
      expect(result).toEqual({ value: 'Geller' });
    });

    it('dependenciesChange - is async function', async () => {
      resources.dependenciesChanges.lastNameDependenciesChange = {
        func: () => new Promise((resolve) => {
          setTimeout(() => { resolve({ value: 'Geller2' }); });
        }),
      };
      const result = await getDependenciesChangeResult('lastName', model, resources);
      expect(result).toEqual({ value: 'Geller2' });
    });
  });

  describe('getFieldComponentStateChanges', () => {
    it('stateChange not exists', async () => {
      const result = await getFieldComponentStateChanges('name', model, resources);
      expect(result).toEqual(undefined);
    });

    it('stateChange is sync function', async () => {
      const result = await getFieldComponentStateChanges('lastName', model, resources);
      expect(result).toEqual({ placeholder: 'Enter Last Name' });
    });

    it('stateChange is async function', async () => {
      resources.components.inputTextLast.stateChange = () => new Promise((resolve) => {
        setTimeout(() => { resolve({ placeholder: 'Enter Last Name' }); });
      });
      const result = await getFieldComponentStateChanges('lastName', model, resources);
      expect(result).toEqual({ placeholder: 'Enter Last Name' });
    });
  });

  describe('getFieldFormattedValue', () => {
    it('formatter not exists', async () => {
      const result = await getFieldFormattedValue('name', model, resources);
      expect(result).toEqual('Rachel');
    });

    it('formatter is sync function', async () => {
      const result = await getFieldFormattedValue('lastName', model, resources);
      expect(result).toEqual('Formatted Green');
    });

    it('formatter is async function', async () => {
      resources.conversions.lastNameFormatter.func = props => new Promise((resolve) => {
        setTimeout(() => { resolve(`Formatted ${props.value}`); });
      });
      const result = await getFieldFormattedValue('lastName', model, resources);
      expect(result).toEqual('Formatted Green');
    });
  });

  describe('getFieldParsedValue', () => {
    it('parser not exists', async () => {
      const result = await getFieldParsedValue('name', model, resources, 'Rachel');
      expect(result).toEqual('Rachel');
    });

    it('parser is sync function', async () => {
      model.fields.lastName.component.value = 'Formatted Green';
      const result = await getFieldParsedValue('lastName', model, resources, 'Formatted Green');
      expect(result).toEqual('Green');
    });

    it('parser is async function', async () => {
      model.fields.lastName.component.value = 'Formatted Green';
      resources.conversions.lastNameParser.func = props => new Promise((resolve) => {
        setTimeout(() => { resolve(props.value.slice(10)); }); // remove 'Formatted ' prefix
      });
      const result = await getFieldParsedValue('lastName', model, resources, 'Formatted Green');
      expect(result).toEqual('Green');
    });
  });
});
