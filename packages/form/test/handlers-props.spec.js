/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  getFieldEvaluateValueProps, getFieldEvaluateStateProps, getFieldTermsProps, getFieldComponentStateChangesProps,
  getFieldValidatorMessageProps, getFieldValidatorFuncProps, getFieldDependenciesChangeProps,
  getFieldComponentFormatterProps, getFieldComponentParserProps, getBeforeAfterActionHookProps,
  getIsEmptyProps, getEmptyMessageProps, getSubmitProps, getValidateFormProps, getToDtoProps, getFromDtoProps,
} from '../src/handlers-props';

describe('Handlers Props', () => {
  let model;
  let expectedName;
  let expectedLast;

  beforeEach(() => {
    model = {
      fields: {
        name: {
          path: 'name',
          label: 'Name',
          component: {
            value: 'formattedName',
            state: { placeholder: 'Enter Name' },
            prevValue: 'prevFormattedName',
            prevState: { placeholder: 'Enter Name' },
           },
          validators: [{ name: 'maxLength' }],
        },
        lastName: {
          path: 'lastName',
          label: 'Last Name',
          component: { value: 'Green', state: { placeholder: 'Enter Lastname' }, prevState: { placeholder: 'Enter Lastname2' } },
          validators: [{ name: 'minLength', args: { value: 2 } }],
          dependencies: ['name'],
          context: ['userId'],
        },
      },
      prevData: { name: 'Monica', lastName: 'Geller' },
      data: { name: 'Rachel', lastName: 'Green' },
      context: { userId: '123', companyId: '456' },
    };
    expectedName = { 
      id: 'name', value: 'Rachel', dependencies: {}, context: {},
    };
    expectedLast = {
      id: 'lastName', value: 'Green', dependencies: { name: { value: 'Rachel' } }, context: { userId: '123' },
    };
  });

  describe('getFieldEvaluateStateProps', () => {
    it('return correct props', () => {
      const result = getFieldEvaluateStateProps('name', model);
      expect(result).toEqual({ state: model.fields.name.component.state });
    });
  });

  describe('getFieldEvaluateValueProps', () => {
    it('return correct props', () => {
      const result = getFieldEvaluateValueProps('name', model);
      expect(result).toEqual({ value: model.fields.name.component.value });
    });
  });

  describe('getSubmitProps', () => {
    it('return correct props', () => {
      const data = { a: 1 };
      const result = getSubmitProps(model, data);
      expect(result).toEqual({ data, context: model.context });
    });
  });

  describe('getBeforeAfterActionHookProps', () => {
    it('return correct props', () => {
      const action = { metadata: { a: 1 }, type: 'INIT' };
      const resources = { validators: {} };
      const result = getBeforeAfterActionHookProps(model, resources, action);
      expect(result).toEqual({ model, resources, metadata: action.metadata, type: action.type });
    });
  });

  describe('getValidateFormProps', () => {
    it('return correct props', () => {
      const result = getValidateFormProps(model);
      expect(result).toEqual({ data: model.data, context: model.context });
    });
  });

  describe('getToDtoProps', () => {
    it('return correct props', () => {
      const result = getToDtoProps(model.data);
      expect(result).toEqual({ data: model.data });
    });
  });

  describe('getFromDtoProps', () => {
    it('return correct props', () => {
      const result = getFromDtoProps(model);
      expect(result).toEqual({ data: model.data });
    });
  });

  describe('getIsEmptyProps', () => {
    it('return correct props - basic', () => {
      delete expectedName.dependencies;
      delete expectedName.context;
      const result = getIsEmptyProps('name', model);
      expect(result).toEqual(expectedName);
    });
  });

  describe('getEmptyMessageProps', () => {
    it('return correct props - basic', () => {
      delete expectedName.dependencies;
      delete expectedName.context;
      const result = getEmptyMessageProps('name', model);
      expectedName.label = 'Name';
      expect(result).toEqual(expectedName);
    });
  });

  describe('getFieldTermsProps', () => {
    it('return correct props - basic', () => {
      const result = getFieldTermsProps('name', model);
      expectedName.args = {};
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies', () => {
      const result = getFieldTermsProps('lastName', model);
      expectedLast.args = {};
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - with args', () => {
      const result = getFieldTermsProps('name', model, { value: 'Ross' });
      expectedName.args = { value: 'Ross' };
      expect(result).toEqual(expectedName);
    });

    it('return correct props - using default props', () => {
      const args = { separator: ';', a: 1 };
      const defaultArgs = { separator: ',', b: 2 };
      expectedName.args = {  separator: ';', a: 1, b: 2 };
      const result = getFieldTermsProps('name', model, args, defaultArgs);
      expect(result).toEqual(expectedName);
    });
  });

  describe('getFieldComponentStateChangesProps', () => {
    it('return correct props - basic', () => {
      const result = getFieldComponentStateChangesProps('name', model);
      Object.assign(expectedName, {
        componentValue: 'formattedName',
        state: { placeholder: 'Enter Name' },
        prevValue: 'Monica',
        prevDependencies: {},
        prevComponentValue: 'prevFormattedName',
        prevState: { placeholder: 'Enter Name' },
      });
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies and prevState', () => {
      const result = getFieldComponentStateChangesProps('lastName', model);
      Object.assign(expectedLast, {
        componentValue: 'Green',
        state: { placeholder: 'Enter Lastname' },
        prevValue: 'Geller',
        prevDependencies: { name: { value: 'Monica' } },
        prevComponentValue: undefined,
        prevState: { placeholder: 'Enter Lastname2' },
      });

      expect(result).toEqual(expectedLast);
    });
  });

  describe('getFieldComponentFormatterProps', () => {
    it('return correct props', () => {
      const result = getFieldComponentFormatterProps('name', model);
      expectedName.args = {};
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies', () => {
      const result = getFieldComponentFormatterProps('lastName', model);
      expectedLast.args = {};
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - using default props', () => {
      const args = { separator: ';', a: 1 };
      const defaultArgs = { separator: ',', b: 2 };
      expectedName.args = {  separator: ';', a: 1, b: 2 };
      const result = getFieldComponentFormatterProps('name', model, args, defaultArgs);
      expect(result).toEqual(expectedName);
    });
  });

  describe('getFieldComponentParserProps', () => {
    it('return correct props', () => {
      const result = getFieldComponentParserProps('name', model);
      expectedName.args = {};
      expectedName.value = 'formattedName';
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies', () => {
      const result = getFieldComponentParserProps('lastName', model);
      expectedLast.args = {};
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - using default props', () => {
      const args = { separator: ';', a: 1 };
      const defaultArgs = { separator: ',', b: 2 };
      expectedLast.args = {  separator: ';', a: 1, b: 2 };
      const result = getFieldComponentParserProps('lastName', model, args, defaultArgs);
      expect(result).toEqual(expectedLast);
    });
  });

  describe('getFieldValidatorMessageProps', () => {
    it('return correct props - basic', () => {
      expectedName.label = 'Name';
      expectedName.args = {};
      const result = getFieldValidatorMessageProps('name', model, 'maxLength');
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies and args and defaultArgs and dynamicArgs', () => {
      const defaultArgs = { value: 0, b: 2 };
      const dynamicArgs = { c: 3 };
      const result = getFieldValidatorMessageProps('lastName', model, 'minLength', defaultArgs, dynamicArgs);
      expectedLast.dependencies = { name: { label: 'Name', value: 'Rachel' } };
      expectedLast.label = 'Last Name';
      expectedLast.args = { value: 2, b: 2, c:3 };
      expect(result).toEqual(expectedLast);
    });
  });

  describe('getFieldValidatorFuncProps', () => {
    it('return correct props - basic', () => {
      expectedName.args = {};
      const result = getFieldValidatorFuncProps('name', model, 'maxLength');
      expect(result).toEqual(expectedName);
    });

    it('return correct props - with dependencies and args and defaultArgs', () => {
      const defaultArgs = { value: 0, b: 2 };
      const result = getFieldValidatorFuncProps('lastName', model, 'minLength', defaultArgs);
      expectedLast.args = { value: 2, b: 2 };
      expect(result).toEqual(expectedLast);
    });
  });

  describe('getFieldDependenciesChangeProps', () => {
    it('return correct props - without prevDependencies', () => {
      expectedLast.state = { placeholder: 'Enter Lastname' };
      expectedLast.prevDependencies = { name: { value: 'Monica' } };
      expectedLast.args = {};
      const result = getFieldDependenciesChangeProps('lastName', model);
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - with args and defaultArgs', () => {
      const defaultArgs = { a: 0, b: 2 };
      const args = { a: 1, c: 3 };
      expectedLast.state = { placeholder: 'Enter Lastname' };
      expectedLast.prevDependencies = { name: { value: 'Monica' } };
      expectedLast.args = { a: 1, b: 2, c: 3 };
      const result = getFieldDependenciesChangeProps('lastName', model, args, defaultArgs);
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - without component', () => {
      model.fields.lastName.component = undefined;
      expectedLast.state = undefined;
      expectedLast.prevDependencies = { name: { value: 'Monica' } };
      expectedLast.args = {};
      const result = getFieldDependenciesChangeProps('lastName', model);
      expect(result).toEqual(expectedLast);
    });

    it('return correct props - with prevDependencies', () => {
      model.prevData = {
        name: 'Rachel2',
        last: 'Green',
      };
      const result = getFieldDependenciesChangeProps('lastName', model);
      expectedLast.state = { placeholder: 'Enter Lastname' };
      expectedLast.prevDependencies = { name: { value: 'Rachel2' } };
      expectedLast.args = {};
      expect(result).toEqual(expectedLast);
    });
  });
});
