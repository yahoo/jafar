/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import { verifyForm } from '../src/index';
import { errors } from '../src/errors';
import formMock from './mocks/common';
import log from '../src/log';

describe('Definition', () => {
  let form;
  let model;
  let resources;
  let settings;
  beforeEach(() => {
    form = cloneDeep(formMock);
    model = form.model; // eslint-disable-line
    resources = form.resources; // eslint-disable-line
    settings = form.settings;
  });

  describe('verifyForm', () => {
    function checkFormErrorCode(form, expectedError) {
      let error;
      try {
        verifyForm(form);
      } catch (err) {
        error = err;
      }
      expect(error.code).toEqual(expectedError.code);
    }

    it('defined ok', () => {
      verifyForm(form);
      expect(() => { verifyForm(form); }).not.toThrow();
    });

    describe('checkId', () => {
      it('throws MISSING_ID when model.id undefined', () => {
        model.id = undefined;
        checkFormErrorCode(form, errors.MISSING_ID);
      });
    });

    describe('checkData', () => {
      it('throws MISSING_DATA when model.data undefined', () => {
        model.data = undefined;
        checkFormErrorCode(form, errors.MISSING_DATA);
      });

      it('throws MISSING_DATA when model.data is null', () => {
        model.data = null;
        checkFormErrorCode(form, errors.MISSING_DATA);
      });

      it('throws MISSING_DATA when model.data is not an object', () => {
        model.data = '';
        checkFormErrorCode(form, errors.MISSING_DATA);
      });
    });

    describe('checkFieldsDefinedAsObject', () => {
      it('throws MISSING_FIELDS when fields undefined', () => {
        model.fields = undefined;
        checkFormErrorCode(form, errors.MISSING_FIELDS);
      });


      it('throws MISSING_FIELDS when fields are array', () => {
        model.fields = [{}];
        checkFormErrorCode(form, errors.MISSING_FIELDS);
      });
    });

    describe('checkFieldsPath', () => {
      it('throws MISSING_FIELD_PATH when some field.path undefined', () => {
        model.fields.name.path = undefined;
        checkFormErrorCode(form, errors.MISSING_FIELD_PATH);
      });
    });

    describe('checkComponents', () => {
      it('throws MISSING_COMPONENT when field.component defined but component.name undefined', () => {
        model.fields.name.component.name = undefined;
        checkFormErrorCode(form, errors.MISSING_COMPONENT);
      });

      it('throws MISSING_COMPONENT when field.component.name defined but resources.components undefined', () => {
        resources.components = undefined;
        checkFormErrorCode(form, errors.MISSING_COMPONENT);
      });

      it('throws MISSING_COMPONENT when field.component.name defined but resources.components[field.component.name] '
        + 'undefined', () => {
        resources.components[model.fields.name.component.name] = undefined;
        checkFormErrorCode(form, errors.MISSING_COMPONENT);
      });

      it('throws MISSING_COMPONENT when field.component.name defined but resources.components[field.component.name].rendered '
        + 'undefined', () => {
        resources.components[model.fields.name.component.name].renderer = undefined;
        checkFormErrorCode(form, errors.MISSING_COMPONENT);
      });
    });

    describe('checkComponentsStateChange', () => {
      it('throws INVALID_STATE_CHANGE when resources.components.someComponent.stateChange defined but not as a function', () => {
        resources.components.inputText.stateChange = '';
        checkFormErrorCode(form, errors.INVALID_STATE_CHANGE);
      });
    });

    describe('checkRedundantConversions', () => {
      it('throws REDUNDANT_CONVERSION when field.formatter defined but field.component undefined', () => {
        delete model.fields.name.parser;
        model.fields.name.component = undefined;
        checkFormErrorCode(form, errors.REDUNDANT_CONVERSION);
        checkFormErrorCode(form, errors.REDUNDANT_CONVERSION);
      });

      it('throws REDUNDANT_CONVERSION when field.parser defined but field.component undefined', () => {
        delete model.fields.name.formatter;
        model.fields.name.component = undefined;
        checkFormErrorCode(form, errors.REDUNDANT_CONVERSION);
        checkFormErrorCode(form, errors.REDUNDANT_CONVERSION);
      });
    });

    describe('checkConversions', () => {
      it('throws MISSING_CONVERSION when field.formatter defined but resources.conversions undefined', () => {
        resources.conversions = undefined;
        checkFormErrorCode(form, errors.MISSING_CONVERSION);
      });
    });

    describe('checkFieldsDependencies', () => {
      it('throws MISSING_DEPENDENCIES_FIELD when field.dependencies defined with field id that is not defined in '
      + 'model.fields', () => {
        model.fields.lastName.dependencies = ['someFieldId'];
        checkFormErrorCode(form, errors.MISSING_DEPENDENCIES_FIELD);
      });
    });

    describe('checkFieldsDependenciesChange', () => {
      it('throws MISSING_DEPENDENCIES_CHANGE when field.dependenciesChange defined but resources.dependenciesChanges '
        + 'undefined', () => {
        resources.dependenciesChanges = undefined;
        checkFormErrorCode(form, errors.MISSING_DEPENDENCIES_CHANGE);
      });

      it('throws MISSING_DEPENDENCIES_CHANGE when field.dependenciesChange defined but '
      + 'resources.dependenciesChanges[field.dependenciesChange] undefined', () => {
        resources.dependenciesChanges = {};
        checkFormErrorCode(form, errors.MISSING_DEPENDENCIES_CHANGE);
      });
    });

    describe('checkValidators', () => {
      it('throws MISSING_VALIDATOR when field.validators defined but resources.validators undefined', () => {
        resources.validators = undefined;
        checkFormErrorCode(form, errors.MISSING_VALIDATOR);
      });

      it('throws MISSING_VALIDATOR when field.validators defined but resources.validators[field.validators[i].func] '
        + 'undefined', () => {
        resources.validators = {};
        checkFormErrorCode(form, errors.MISSING_VALIDATOR);
      });

      it('throws MISSING_VALIDATOR when field.validators defined but resources.validators[field.validators[i].func].func '
      + 'undefined', () => {
        resources.validators.uniqueName.func = undefined;
        checkFormErrorCode(form, errors.MISSING_VALIDATOR);
      });

      it('throws MISSING_VALIDATOR when field.validators defined but resources.validators[field.validators[i].func].message '
      + 'undefined', () => {
        resources.validators.uniqueName.message = undefined;
        checkFormErrorCode(form, errors.MISSING_VALIDATOR);
      });
    });

    describe('checkTerms', () => {
      describe('excludeTerm', () => {
        beforeEach(() => {
          delete model.fields.name.disableTerm;
          delete model.fields.name.requireTerm;
        });

        it('throws MISSING_TERM when field.excludeTerm defined but resources.terms undefined', () => {
          resources.terms = undefined;
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.excludeTerm defined but resources.terms[field.excludeTerm.func] '
          + 'undefined', () => {
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.excludeTerm defined but resources.terms[field.excludeTerm.terms[0].func] '
        + 'undefined', () => {
          model.fields.name.excludeTerm = { operator: 'and', terms: [{ name: 'myCustomTerm' }] };
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });
      });
      describe('disableTerm', () => {
        beforeEach(() => {
          delete model.fields.name.excludeTerm;
          delete model.fields.name.requireTerm;
        });

        it('throws MISSING_TERM when field.disableTerm defined but resources.terms undefined', () => {
          resources.terms = undefined;
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.disableTerm defined but resources.terms[field.disableTerm.func] '
          + 'undefined', () => {
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.disableTerm defined but resources.terms[field.disableTerm.terms[0].func] '
        + 'undefined', () => {
          model.fields.name.disableTerm = { operator: 'and', terms: [{ name: 'myCustomTerm' }] };
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });
      });
      describe('requireTerm', () => {
        beforeEach(() => {
          delete model.fields.name.excludeTerm;
          delete model.fields.name.disabledTerms;
        });

        it('throws MISSING_TERM when field.requireTerm defined but resources.terms undefined', () => {
          resources.terms = undefined;
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.requireTerm defined but resources.terms[field.requireTerm.func] '
          + 'undefined', () => {
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });

        it('throws MISSING_TERM when field.requireTerm defined but resources.terms[field.requireTerm.terms[0].func] '
        + 'undefined', () => {
          model.fields.name.requireTerm = { operator: 'and', terms: [{ name: 'myCustomTerm' }] };
          resources.terms = {};
          checkFormErrorCode(form, errors.MISSING_TERM);
        });
      });
    });

    describe('checkEmptyTermIntegrity', () => {
      it('logs warning when resources.terms.empty is overridden', () => {
        resources.terms.empty = () => {};
        log.warn = jest.fn();
        verifyForm(form);
        expect(log.warn).toHaveBeenCalled();
      });
    });

    describe('checkHooks', () => {
      it('throws MISSING_HOOKS when resources.hooks undefined', () => {
        resources.hooks = undefined;
        checkFormErrorCode(form, errors.MISSING_HOOKS);
      });

      it('throws MISSING_HOOKS when resources.hooks is null', () => {
        resources.hooks = null;
        checkFormErrorCode(form, errors.MISSING_HOOKS);
      });

      it('throws MISSING_HOOKS when resources.hooks is not an object', () => {
        resources.hooks = [];
        checkFormErrorCode(form, errors.MISSING_HOOKS);
      });

      it('throws INVALID_HOOK when resources.hooks includes unsupported action', () => {
        resources.hooks = { blaHook: () => {} };
        checkFormErrorCode(form, errors.INVALID_HOOK);
      });

      it('ok when hook is supported', () => {
        resources.hooks = { validate: () => {} };
        let error;
        try {
          verifyForm(form);
        } catch (err) {
          error = err;
        }
        expect(error).toEqual(undefined);
      });
    });

    describe('checkSettings', () => {
      ['changeValueDebounceWait', 'changeValueDebounceMaxWait', 'changeStateDebounceWait',
        'changeStateDebounceMaxWait'].forEach(key => {
        describe(key, () => {
          it(`throws INVALID_SETTING when settings.${key} invalid`, () => {
            ['100', -100, null].forEach(value => {
              settings[key] = value;
              checkFormErrorCode(form, errors.INVALID_SETTING);
            });
          });
  
          it(`ok when setting.${key} is defined well`, () => {
            [100, undefined].forEach(value => {
              settings[key] = value;
              let error;
              try {
                verifyForm(form);
              } catch (err) {
                error = err;
              }
              expect(error).toEqual(undefined);
            });
          });
        });
      });
    });
  });
});
