/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import transpileForm from '../src/transpile';

describe('Definition Transpile', () => {
  let form;

  beforeEach(() => {
    form = {
      model: {
        fields: {
          name1: { path: 'name1' },
          name2: { path: 'name2' },
          name3: { path: 'name3' },
        },
      },
      resources: {},
    };
  });

  it('transpile components ok', () => {
    // prepare
    const component = () => {};   
    form.model.fields.name1.component = 'MyComponent';
    form.model.fields.name2.component = component;
    form.resources.components = { Text: component };

    // expected
    const expectedForm = cloneDeep(form);
    expectedForm.model.fields.name1.component = { name: 'MyComponent' };
    expectedForm.model.fields.name2.component = { name: 'component1' };
    expectedForm.resources.components = { 
      component1: { renderer: component },
      Text: { renderer: component },
    };

    const traspiledForm = transpileForm(form);
    expect(traspiledForm).toEqual(expectedForm);
  });

  it('transpile formatters ok', () => {
    // prepare
    const formatter = () => {};   
    form.model.fields.name1.formatter = 'myFormatter';
    form.model.fields.name2.formatter = formatter;
    form.resources.conversions = { toDate: formatter };

    // expected
    const expectedForm = cloneDeep(form);
    expectedForm.model.fields.name1.formatter = { name: 'myFormatter' };
    expectedForm.model.fields.name2.formatter = { name: 'formatter1' };
    expectedForm.resources.conversions = { 
      formatter1: { func: formatter },
      toDate: { func: formatter },
    };

    const traspiledForm = transpileForm(form);
    expect(traspiledForm).toEqual(expectedForm);
  });

  it('transpile parsers ok', () => {
    // prepare
    const parser = () => {};   
    form.model.fields.name1.parser = 'myParser';
    form.model.fields.name2.parser = parser;
    form.resources.conversions = { toDate: parser };

    // expected
    const expectedForm = cloneDeep(form);
    expectedForm.model.fields.name1.parser = { name: 'myParser' };
    expectedForm.model.fields.name2.parser = { name: 'parser1' };
    expectedForm.resources.conversions = { 
      parser1: { func: parser },
      toDate: { func: parser },
    };

    const traspiledForm = transpileForm(form);
    expect(traspiledForm).toEqual(expectedForm);
  });

  it('transpile dependenciesChanges ok', () => {
    // prepare
    const dependenciesChange = () => {};   
    form.model.fields.name1.dependenciesChange = 'myChange';
    form.model.fields.name2.dependenciesChange = dependenciesChange;
    form.resources.dependenciesChanges = { toDate: dependenciesChange };

    // expected
    const expectedForm = cloneDeep(form);
    expectedForm.model.fields.name1.dependenciesChange = { name: 'myChange' };
    expectedForm.model.fields.name2.dependenciesChange = { name: 'dependenciesChange1' };
    expectedForm.resources.dependenciesChanges = { 
      dependenciesChange1: { func: dependenciesChange },
      toDate: { func: dependenciesChange },
    };

    const traspiledForm = transpileForm(form);
    expect(traspiledForm).toEqual(expectedForm);
  });

  it('transpile validators ok', () => {
    // prepare
    const validator = () => {};   
    form.model.fields.name1.validators = ['myValidator1', validator, { name: 'myValidator2' }];
    form.resources.validators = { hasPermission: validator };

    // expected
    const expectedForm = cloneDeep(form);
    expectedForm.model.fields.name1.validators = [{ name: 'myValidator1' }, { name: 'validator1' }, { name: 'myValidator2' }];
    expectedForm.resources.validators = { 
      validator1: { func: validator },
      hasPermission: { func: validator },
    };

    const traspiledForm = transpileForm(form);
    expect(traspiledForm).toEqual(expectedForm);
  });

  it('transpile exclude terms ok', () => {
    testTerm(form, 'excludeTerm');
  });

  it('transpile disable terms ok', () => {
    testTerm(form, 'disableTerm');
  });

  it('transpile require terms ok', () => {
    testTerm(form, 'requireTerm');
  });
});

function testTerm(form, termName) {
  // prepare
  const term = () => {};   
  form.model.fields.name1[termName] = 'myTerm';
  form.model.fields.name2[termName] = term;
  form.model.fields.name3[termName] = {
    operator: 'and',
    terms: [{ name: 'myTerm2' }, 'myTerm3', term],
  };
  form.resources.terms = { hasPermission: term };

  // expected
  const expectedForm = cloneDeep(form);
  expectedForm.model.fields.name1[termName] = { name: 'myTerm' };
  expectedForm.model.fields.name2[termName] = { name: `${termName}1` };
  expectedForm.model.fields.name3[termName] = { 
    operator: 'and',
    terms: [{ name: 'myTerm2' }, { name: 'myTerm3' }, { name: `${termName}2` }],
  };

  expectedForm.resources.terms = { 
    [`${termName}1`]: { func: term },
    [`${termName}2`]: { func: term },
    hasPermission: { func: term },
  };

  const traspiledForm = transpileForm(form);
  expect(traspiledForm).toEqual(expectedForm);
}
