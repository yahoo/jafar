/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep, noop } from 'lodash';
import simpleFormMock from './mocks/simple';
import commonFormMock from './mocks/common';
import dependencyChangeFormMock from './mocks/dependency-change';
import dependencyChangeWithParserFormatterFormMock from './mocks/dependencies-change-with-parser-formatter';
import syncValidatorFormMock from './mocks/sync-validator';
import asyncValidatorFormMock from './mocks/async-validator';
import stateChangesFormMock from './mocks/state-changes';
import processQueueFormMock from './mocks/process-queue';
import dependenciesMock from './mocks/dependencies';
import Form from '../src/index';
import { errors } from '../src/errors';
import log from '../src/log';

describe('Form', () => {
  let simpleForm;
  let commonForm;
  let dependencyChangeForm;
  let dependencyChangeWithParserFormatterForm;
  let syncValidatorForm;
  let asyncValidatorForm;
  let stateChangesForm;
  let processQueueForm;
  let dependenciesForm;

  beforeEach(() => {
    simpleForm = cloneDeep(simpleFormMock);
    commonForm = cloneDeep(commonFormMock);
    dependencyChangeForm = cloneDeep(dependencyChangeFormMock);
    dependencyChangeWithParserFormatterForm = cloneDeep(dependencyChangeWithParserFormatterFormMock);
    syncValidatorForm = cloneDeep(syncValidatorFormMock);
    asyncValidatorForm = cloneDeep(asyncValidatorFormMock);
    stateChangesForm = cloneDeep(stateChangesFormMock);
    processQueueForm = cloneDeep(processQueueFormMock);
    dependenciesForm = cloneDeep(dependenciesMock);
  });

  describe('create form', () => {
    it('create few forms without id', async () => {
      let form = new Form();
      simpleForm.model.id = undefined;
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.id).toEqual('form-1');

      form = new Form();
      delete simpleForm.model.id;
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.id).toEqual('form-2');

      form = new Form();
      simpleForm.model.id = 'some-id';
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.id).toEqual('some-id');

      form = new Form();
      delete simpleForm.model.id;
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.id).toEqual('form-3');
    });

    it('init with toDto', async () => {
      simpleForm.model.data = { a: 1 };
      const expectedData = { a: 2 };
      simpleForm.resources.hooks = {
        toDto: ({ data }) => ({ a: data.a + 1 }),
      };
      let publicForm;
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources, undefined, x => { publicForm = x; });
      expect(form.data).toEqual(expectedData);
      expect(publicForm.model.data).toEqual(expectedData);
      expect(publicForm.model.initializedData).toEqual(expectedData);
      expect(publicForm.model.initialModel.data).toEqual({ a: 1 });
    });

    it('init persistent form with toDto and reset', async () => {
      const serverData = { name: 1 }
      simpleForm.model.data = serverData;
      let expectedDataAfterFirstInit = { name: 2 };
      simpleForm.resources.hooks = {
        toDto: ({ data }) => ({ name: data.name + 1 }),
      };
      let publicForm;
      let form = new Form();
      await form.init(simpleForm.model, simpleForm.resources, undefined, x => { publicForm = x; });
      expect(form.data).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.data).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.initializedData).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.initialModel.data).toEqual(serverData);

      const expectedData = { name: 3 };
      await form.changeValue('name', 3);
      expect(form.data).toEqual(expectedData);

      form = new Form();
      await form.init(publicForm.model, simpleForm.resources, undefined, x => { publicForm = x; });
      expect(form.data).toEqual(expectedData);
      expect(publicForm.model.data).toEqual(expectedData);
      expect(publicForm.model.initializedData).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.initialModel.data).toEqual(serverData);

      await form.reset();
      expect(form.data).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.data).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.initializedData).toEqual(expectedDataAfterFirstInit);
      expect(publicForm.model.initialModel.data).toEqual(serverData);
    });
  });

  describe('change field value', () => {
    it('should update the form data on change field value', async () => {
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.data).toEqual({});
      await form.changeValue('name', 'Gal');
      expect(form.data).toEqual({
        name: 'Gal',
      });
    });

    it('using updater function - with component value - changed ok', async () => {
      const form = new Form();
      simpleForm.model.fields.name.component = {
        name: 'inputText',
        value: 1,
      };
      simpleForm.model.data.name = 1;
      simpleForm.resources.components = {
        inputText: { renderer: noop },
      };

      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.pendingActions).toEqual([]);
      const promise1 = form.changeValue('name', ({ value }) => (value + 1));
      const promise2 = form.changeValue('name', ({ value }) => (value + 1));
      await Promise.all([promise1, promise2]);
      expect(form.fields.name.component.value).toEqual(3);
      expect(form.data.name).toEqual(3);
      expect(form.pendingActions).toEqual([]);
    });

    it('using updater function - without a component definition - throws error', async () => {
      const form = new Form();
      delete simpleForm.model.fields.name.component;
      simpleForm.model.data.name = 1;
      let error;
      log.error  = (err) => { error = err; };
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.pendingActions).toEqual([]);
      await form.changeValue('name', ({ value }) => (value + 1));
      expect(error.code).toEqual(errors.CHANGE_VALUE_UPDATER_NOT_SUPPORTED.code);
      expect(form.fields.name.component).toEqual(undefined);
      expect(form.data.name).toEqual(1);
      expect(form.pendingActions).toEqual([]);
    });

    it('should resolve after dependency change', async () => {
      const form = new Form();
      await form.init(dependencyChangeForm.model, dependencyChangeForm.resources);
      await form.changeValue('country', 'Israel');
      expect(form.data).toEqual({
        country: 'Israel', city: 'Tel Aviv', address: 'Ben Yehuda', countryCode: 'IL',
      });
    });

    it('should remove field the form data on set empty field value', async () => {
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.data).toEqual({});
      await form.changeValue('name', 'Gal');
      expect(form.data).toEqual({
        name: 'Gal',
      });
      await form.changeValue('name', '');
      expect(form.data).toEqual({});
    });

    it('should handle dependencies change changes value - to a field with parser formatter', async () => {
      const form = new Form();
      await form.init(dependencyChangeWithParserFormatterForm.model, dependencyChangeWithParserFormatterForm.resources);
      expect(form.data).toEqual({});
      await form.changeValue('country', 'Israel');
      expect(form.data).toEqual({ country: 'IL', city: 'JRM' });
      expect(form.fields.country.component.value).toEqual('Israel');
      expect(form.fields.city.component.value).toEqual('Jerusalem');
      await form.changeValue('city', 'Tel Aviv');
      expect(form.data).toEqual({ country: 'IL', city: 'TLV' });
      expect(form.fields.country.component.value).toEqual('Israel');
      expect(form.fields.city.component.value).toEqual('Tel Aviv');
    });

    it('after dependenciesChange return both new value and state, stateChange uses new data value and view value of itself', async () => {
      const form = new Form();
      let values;
      dependencyChangeWithParserFormatterForm.model.fields.address = {
        path: 'address',
        dependencies: ['city'],
        dependenciesChange: ({ dependencies, prevDependencies }) => {
          if (prevDependencies && (dependencies.city.value !== prevDependencies.city.value)) {
            return {
              value: dependencies.city.value,
              state: { a: 1 },
            }
          }
        },
        component: { 
          name: 'address',
        },
        parser: ({ value }) => value === 'Tel Aviv' ? 'TLV' : 'JRM',
        formatter: ({ value }) => value === 'TLV' ? 'Tel Aviv' : 'Jerusalem',
      };
      dependencyChangeWithParserFormatterForm.resources.components.address = {
        renderer: () => {},
        stateChange: ({ value, componentValue }) => {
          if (values) { // only after init
            values.push(`${value} ${componentValue}`);
          }
        },
      };
      await form.init(dependencyChangeWithParserFormatterForm.model, dependencyChangeWithParserFormatterForm.resources);
      values = [];
      await form.changeValue('city', 'Tel Aviv');
      await form.changeValue('city', 'Jerusalem');
      expect(values).toEqual([
        'TLV Tel Aviv',
        'JRM Jerusalem',
      ]);
    });

    describe('mode cases - with boolean required', () => {
      it('field.validators = [‘uniqueName’], field.required = true, incoming value = empty', async () => {
        syncValidatorForm.model.fields.name.required = true;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn();

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', '');

        // verify value unset
        expect(form.data.name).toEqual(undefined);
        // verify required error
        expect(form.fields.name.errors).toEqual([{ name: 'required', message: 'Field required' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(false);
        expect(form.fields.name.empty).toEqual(true);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).not.toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = empty', async () => {
        syncValidatorForm.model.fields.name.required = false;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn();

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', '');

        // verify value unset
        expect(form.data.name).toEqual(undefined);
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(false);
        expect(form.fields.name.empty).toEqual(true);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).not.toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = true, incoming value = not empty - valid name', async () => {
        syncValidatorForm.model.fields.name.required = true;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => true);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = true, incoming value = not empty - not valid name', async () => {
        syncValidatorForm.model.fields.name.required = true;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => false);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([{ name: 'uniqueName', message: 'Name should be unique' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = not empty - valid name', async () => {
        syncValidatorForm.model.fields.name.required = false;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => true);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = not empty - not valid name', async () => {
        syncValidatorForm.model.fields.name.required = false;
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => false);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([{ name: 'uniqueName', message: 'Name should be unique' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });
    });

    describe('mode cases - with requireTerm', () => {
      it('field.validators = [‘uniqueName’], field.required = true, incoming value = empty', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => true) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn();

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', '');

        // verify value unset
        expect(form.data.name).toEqual(undefined);
        // verify required error
        expect(form.fields.name.errors).toEqual([{ name: 'required', message: 'Field required' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(false);
        expect(form.fields.name.empty).toEqual(true);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).not.toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = empty', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => false) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn();

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', '');

        // verify value unset
        expect(form.data.name).toEqual(undefined);
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(false);
        expect(form.fields.name.empty).toEqual(true);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).not.toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = true, incoming value = not empty - valid name', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => true) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => true);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = true, incoming value = not empty - not valid name', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => true) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => false);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([{ name: 'uniqueName', message: 'Name should be unique' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = not empty - valid name', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => false) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => true);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(false);
        expect(form.invalid).toEqual(false);
        expect(form.errors).toEqual({});
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });

      it('field.validators = [‘uniqueName’], field.required = false, incoming value = not empty - not valid name', async () => {
        syncValidatorForm.model.fields.name.requireTerm = { name: 'isRequired' };
        syncValidatorForm.resources.terms = { isRequired: { func: jest.fn(() => false) } };
        syncValidatorForm.resources.validators.uniqueName.func = jest.fn(() => false);

        const form = new Form();
        await form.init(syncValidatorForm.model, syncValidatorForm.resources);
        await form.changeValue('name', 'Rachel');

        // verify value unset
        expect(form.data.name).toEqual('Rachel');
        // verify no error
        expect(form.fields.name.errors).toEqual([{ name: 'uniqueName', message: 'Name should be unique' }]);
        // verify flags
        expect(form.fields.name.dirty).toEqual(true);
        expect(form.fields.name.empty).toEqual(false);
        expect(form.fields.name.invalid).toEqual(true);
        expect(form.invalid).toEqual(true);
        expect(form.errors).toEqual({ name: form.fields.name.errors });
        // verify validators not called
        expect(syncValidatorForm.resources.validators.uniqueName.func).toHaveBeenCalled();
      });
    });

    describe('fields dependencies', () => {
      it('should trigger dependent field evaluation', async () => {
        const invalidError = [{ name: 'descriptionContainsSubject', message: 'Subject should be included in description' }];
        const requiredError = [{ name: 'required', message: 'Field required' }];
        const form = new Form();
        await form.init(dependenciesForm.model, dependenciesForm.resources);
        expect(form.invalid).toEqual(false);

        // change subject to 'a'
        await form.changeValue('subject', 'a');
        // verify data
        expect(form.data).toEqual({ subject: 'a' });
        // verify errors
        expect(form.fields.subject.errors).toEqual(invalidError);
        expect(form.fields.description.errors).toEqual(requiredError);
        // verify form validity
        expect(form.invalid).toEqual(true);

        // change description to 'b'
        await form.changeValue('description', 'b');
        // verify data
        expect(form.data).toEqual({ subject: 'a', description: 'b' });
        // verify errors
        expect(form.fields.subject.errors).toEqual(invalidError);
        expect(form.fields.description.errors).toEqual(invalidError);
        // verify form validity
        expect(form.invalid).toEqual(true);

        // change description to 'ba'
        await form.changeValue('description', 'ba');
        // verify data
        expect(form.data).toEqual({ subject: 'a', description: 'ba' });
        // verify errors
        expect(form.fields.subject.errors).toEqual([]);
        expect(form.fields.description.errors).toEqual([]);
        // verify form validity
        expect(form.invalid).toEqual(false);
      });
    });
  });

  describe('2 Form instances with the same id', () => {
    it('destroy first without await -> init second without await - both with same form definition (id in specific)', async () => {
        let uiForm1;
        let uiForm2;
        const updateUiFrom1 = (form) => { uiForm1 = form; };
        const updateUiFrom2 = (form) => { uiForm2 = form; };
        const form1 = new Form();
        await form1.init(commonForm.model, commonForm.resources, undefined, updateUiFrom1);
        const resolve1 = form1.destroy();
        const form2 = new Form();
        const resolve2 = form2.init(commonForm.model, commonForm.resources, undefined, updateUiFrom2);
        await Promise.all([resolve1, resolve2]);

        expect(uiForm1).toEqual(undefined);
        expect(uiForm2).toBeTruthy();
    });
  });

  describe('process queue', () => {
    describe('should handle queue of processes one after another, and not mixed together', () => {
      it('form class demonstration', async () => {
        const form = new Form();
        await form.init(processQueueForm.model, processQueueForm.resources);
        expect(form.data).toEqual({});
        expect(form.invalid).toBeFalsy();

        // form class case - working ok cause we are waiting
        await form.changeValue('name', 'Rachel');
        await form.changeValue('name', 'Monica');

        expect(form.data).toEqual({ name: 'Monica' });
        expect(form.invalid).toBeFalsy();
      });

      /* TODO: add process queue to fix bug. After adding the process queue - this test should ensure it
      This is the bug that fails the below test for now:
      1. set name Rachel
      2. set name Monica
      3. validate monica + update form invalid -> Form is valid
      4. validate rachel + update form invalid -> Form is invalid

      The correct order - using process queue - needs to be (the test will pass after adding process queue)
      1. set name Rachel
      2. validate rachel + update form invalid -> Form is invalid
      3. set name Monica
      4. validate monica + update form invalid -> Form is valid
      */
      it('react-form demonstration', async () => {
        const form = new Form();
        await form.init(processQueueForm.model, processQueueForm.resources);
        expect(form.data).toEqual({});
        expect(form.invalid).toBeFalsy();

        // react form case - fails (without having await one after another in the same code block -
        // can call action parallel from the ui)
        form.changeValue('name', 'Rachel');
        await wait(250); // wait for debounce to finish
        form.changeValue('name', 'Monica');
        await wait(1000); // wait for process to finish

        expect(form.data).toEqual({ name: 'Monica' });
        expect(form.invalid).toBeFalsy();
      });
    });
  });

  describe('destroy form', () => {
    it('should destroy form', async () => {
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.id).toEqual('simple');
      await form.destroy();
      let called = false;
      try {
        const { id } = form; // eslint-disable-line
      } catch (err) {
        called = true;
      }
      expect(called).toBeTruthy();
    });
  });

  describe('state changes', () => {
    it('changed ok', async () => {
      const form = new Form();
      simpleForm.model.fields.name.component = {
        name: 'inputText',
        state: {},
      };
      simpleForm.resources.components = {
        inputText: { renderer: noop },
      };

      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.pendingActions).toEqual([]);
      await form.changeState('name', { mockState: 'mockState' });
      expect(form.fields.name.component.state).toEqual({ mockState: 'mockState' });
      expect(form.pendingActions).toEqual([]);
    });

    it('using updater function - changed ok', async () => {
      const form = new Form();
      simpleForm.model.fields.name.component = {
        name: 'inputText',
        state: {
          num: 1,
        },
      };
      simpleForm.resources.components = {
        inputText: { renderer: noop },
      };

      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.pendingActions).toEqual([]);
      const promise1 = form.changeState('name', ({ state }) => ({ num: state.num + 1 }));
      const promise2 = form.changeState('name', ({ state }) => ({ num: state.num + 1 }));
      await Promise.all([promise1, promise2]);
      expect(form.fields.name.component.state).toEqual({ num: 3 });
      expect(form.pendingActions).toEqual([]);
    });

    it('loop state changes - ok', async () => {
      const form = new Form();
      await form.init(stateChangesForm.model, stateChangesForm.resources);
      expect(form.pendingActions).toEqual([]);
      const afterInitState = {
        items: [{ label: 'Monica', value: 'MONICA' }, { label: 'Ross', value: 'ROSS' }],
        isLoading: false,
        search: {
          value: '',
        },
      };
      expect(form.fields.name.component.state).toEqual(afterInitState);
      const newState = Object.assign(afterInitState, {
        search: {
          value: 'm',
        },
      });
      await form.changeState('name', newState);
      const afterChangeState = {
        items: [{ label: 'Monica', value: 'MONICA' }],
        isLoading: false,
        search: {
          value: 'm',
        },
      };
      expect(form.fields.name.component.state).toEqual(afterChangeState);
      expect(form.pendingActions).toEqual([]);
    });
  });

  describe('Field change ui', () => {
    it('changed ok - only component', async () => {
      const component = { name: 'myInputText' };
      simpleForm.resources.components = {
        myInputText: {
          renderer: () => {},
        },
      };
      const expectedComponent = { 
        name: 'myInputText', 
        value: undefined,
        state: {},
        modelState: {},
        prevState: undefined,
        prevValue: undefined,
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      await form.changeUi('name', { component });
      expect(form.fields.name.component).toEqual(expectedComponent);
      expect(form.fields.name.formatter).toEqual(undefined);
      expect(form.fields.name.parser).toEqual(undefined);
    });

    it('changed ok - with label, description ,component, formatter, parser', async () => {
      const label = 'New Label';
      const description = 'New Description';
      const component = { name: 'myInputText' };
      const formatter = { name: 'formatter1' };
      const parser = { name: 'parser1' };
      const expectedComponent = { 
        name: 'myInputText', 
        value: undefined,
        state: {},
        modelState: {},
        prevState: undefined,
        prevValue: undefined,
      };
      simpleForm.resources.components = {
        myInputText: {
          renderer: () => {},
        },
      };
      simpleForm.resources.conversions = {
        formatter1: { func: () => {} },
        parser1: { func: () => {} },
      };
      const ui =  { label, description, component, formatter, parser };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      await form.changeUi('name', ui);
      expect(form.fields.name.label).toEqual(label);
      expect(form.fields.name.description).toEqual(description);
      expect(form.fields.name.component).toEqual(expectedComponent);
      expect(form.fields.name.formatter).toEqual(formatter);
      expect(form.fields.name.parser).toEqual(parser);
    });

    it('changed ok - with component, formatter and no parser', async () => {
      const component = { name: 'myInputText' };
      const expectedComponent = { 
        name: 'myInputText', 
        value: undefined,
        state: {},
        modelState: {},
        prevState: undefined,
        prevValue: undefined,
      };
      const formatter = { name: 'formatter1' };
      simpleForm.resources.components = {
        myInputText: {
          renderer: () => {},
        },
      };
      simpleForm.resources.conversions = {
        formatter1: { func: () => {} },
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      await form.changeUi('name', { component, formatter });
      expect(form.fields.name.component).toEqual(expectedComponent);
      expect(form.fields.name.formatter).toEqual(formatter);
      expect(form.fields.name.parser).toEqual(undefined);
    });

    it('didn\'t change - throws missing component', async () => {
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      let error;
      log.error  = (err) => { error = err; };
      await form.changeUi('name', { component: { name: 'myInputText2' } });
      expect(error.code).toEqual(errors.ACTION_FAILED.code);
      expect(error.subError.code).toEqual(errors.MISSING_COMPONENT.code);
    });
  });

  describe('change data', () => {
    it('should update the form data to a new object and evaluates form', async () => {
      const form = new Form();
      await form.init(commonForm.model, commonForm.resources);
      expect(form.data).toEqual({ name: 'Rachel', lastName: 'Green' });
      const newData = { name: 'Monica', lastName: 'Geller' };
      await form.changeData(newData);
      expect(form.data).toEqual(newData);
      expect(form.fields.name.component.value).toEqual('Formatted Monica');
    });
  });

  describe('change context', () => {
    it('should update the form context to a new object and evaluate form', async () => {
      const form = new Form();
      commonForm.model.fields.lastName.excludeTerm = { name: 'ifUser222' };
      commonForm.resources.terms.ifUser222 = { func: ({context}) => context.userId === '222' };
      await form.init(commonForm.model, commonForm.resources);
      expect(form.context).toEqual({ userId: '123', companyId: '789' });
      expect(form.fields.lastName.excluded).toBeFalsy();
      const newContext = { userId: '222',  companyId: '333' };
      await form.changeContext(newContext);
      expect(form.context).toEqual(newContext);
      expect(form.fields.lastName.excluded).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('should throw invalid submit when form is invalid', async () => {
      simpleForm.model.fields.name.required = true;
      simpleForm.model.data = {};
      let error;
      log.error = (err) => { error = err; };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.invalid).toEqual(true);
      const success = await form.submit();
      // verify submit fail
      expect(success).toEqual(undefined);
      expect(error.code).toEqual(errors.ACTION_FAILED.code);
      expect(error.subError.code).toEqual(errors.INVALID_SUBMIT.code);
    });

    it('validate return errors', async () => {
      simpleForm.model.fields.excludedField = { path: 'excludedField', excludeTerm: { name: 'excludeMe' } };
      simpleForm.resources.terms = { excludeMe: { func: () => true } };
      // validate returns errors of:
      // existing fields with errors, un existing fields, excluded fields, undefined fieldId, fields with empty errors
      const errors = [{ name: 'unique', message: 'already exists' }];
      simpleForm.resources.hooks = {
        validate: jest.fn(() => ({ 
          name: errors,
          lastName: [],
          bla: errors,
          excludedField: errors,
          undefined: errors,
        })),
        submit: jest.fn(),
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      // verify submit fail
      expect(success).toEqual(undefined);
      // check validate called
      expect(simpleForm.resources.hooks.validate).toHaveBeenCalled();
      // check submit not called
      expect(simpleForm.resources.hooks.submit).not.toHaveBeenCalled();
      // check only existing non-excluded fields has errors and invalid now
      expect(form.fields.name.errors).toEqual(errors);
      expect(form.fields.name.invalid).toEqual(true);
      expect(form.fields.lastName.errors).toEqual([]);
      expect(form.fields.lastName.invalid).toEqual(false);
      expect(form.fields.excludedField.errors).toEqual([]);
      expect(form.fields.excludedField.invalid).toEqual(false);
      // verify also form errors and invalid 
      expect(form.errors).toEqual({ name: errors });
      expect(form.invalid).toEqual(true);
    });

    it('validate return errors - undefined', async () => {
      // validate returns errors undefined
      const data = { name: 'Rachel' };
      simpleForm.model.data = data;
      simpleForm.resources.hooks = {
        validate: jest.fn(() => undefined),
        submit: jest.fn(),
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      // verify submit success
      expect(success).toEqual(true);
      // check validate called
      expect(simpleForm.resources.hooks.validate).toHaveBeenCalled();
      // check submit not called
      expect(simpleForm.resources.hooks.submit).toHaveBeenCalledWith({ data, context: {} });
      // verify form errors = [] and invalid = false
      expect(form.errors).toEqual({});
      expect(form.invalid).toEqual(false);
    });

    it('validate return errors object - empty', async () => {
      // validate returns errors undefined
      const data = { name: 'Rachel' };
      simpleForm.model.data = data;
      simpleForm.resources.hooks = {
        validate: jest.fn(() => {}),
        submit: jest.fn(),
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      // verify submit success
      expect(success).toEqual(true);
      // check validate called
      expect(simpleForm.resources.hooks.validate).toHaveBeenCalled();
      // check submit not called
      expect(simpleForm.resources.hooks.submit).toHaveBeenCalledWith({ data, context: {} });
      // verify form errors = [] and invalid = false
      expect(form.errors).toEqual({});
      expect(form.invalid).toEqual(false);
    });

    it('validate return errors - not empty - but all errors are empty', async () => {
      const data = { name: 'Rachel' };
      simpleForm.model.data = data;
      simpleForm.resources.hooks = {
        validate: jest.fn(() => ({ name: [] })),
        submit: jest.fn(),
      };
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      // verify submit success
      expect(success).toEqual(true);
      // check validate called
      expect(simpleForm.resources.hooks.validate).toHaveBeenCalled();
      // check submit not called
      expect(simpleForm.resources.hooks.submit).toHaveBeenCalledWith({ data, context: {} });
      // verify form errors = [] and invalid = false
      expect(form.errors).toEqual({});
      expect(form.invalid).toEqual(false);
    });

    it('should wait for sync submit', async () => {
      const form = new Form();
      const data = { name: 'rachel' };
      simpleForm.model.data = data;
      let resultData;
      simpleForm.resources.hooks = {
        submit: ({ data }) => { resultData = data; },
      };
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      expect(success).toEqual(true);
      expect(resultData).toEqual(data);
    });

    it('should wait for sync submit with fromDto', async () => {
      const form = new Form();
      const data = { a: 1 };
      simpleForm.model.data = data;
      let resultData;
      simpleForm.resources.hooks = {
        fromDto: ({ data }) => ({ a: data.a + 1 }),
        submit: ({ data }) => { resultData = data; },
      };
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      expect(success).toEqual(true);
      expect(resultData).toEqual({ a: 2 });
    });

    it('should wait for async submit', async () => {
      const form = new Form();
      const data = { name: 'rachel' };
      simpleForm.model.data = data;
      let resultData;
      simpleForm.resources.hooks = {
        submit: props => new Promise((resolve) => {
          setTimeout(() => {
            resultData = props.data;
            resolve();
          }, 1);
        }),
      };
      await form.init(simpleForm.model, simpleForm.resources);
      const success = await form.submit();
      expect(success).toEqual(true);
      expect(resultData).toEqual(data);
      // verify data was not deleted after submit from the form
      expect(form.data).toEqual(resultData);
    });
  });

  describe('reset', () => {
    it('resets to the initial form after form had changes', async () => {
      delete commonForm.model.initializedData;
      let publicForm;

      const form = new Form();
      await form.init(commonForm.model, commonForm.resources, (x) => { publicForm = x; });
      const formAfterFirstUnit = publicForm;

      // change field value
      expect(form.data).toEqual({ name: 'Rachel', lastName: 'Green' });
      await form.changeValue('lastName', 'Geller');
      expect(form.data).toEqual({ name: 'Rachel', lastName: 'Geller' });
      // change ui
      expect(form.fields.lastName.component).toBeFalsy();
      await form.changeUi('lastName', { component: { name: 'inputText' } });
      expect(form.fields.lastName.component).toBeTruthy();
      // change state
      expect(form.fields.name.component.state).toEqual({});
      await form.changeState('name', { test: 'mock-test' });
      expect(form.fields.name.component.state).toEqual({ test: 'mock-test' });
      // reset
      await form.reset();

      /* make sure that after init both forms:
      1. form that just passed init
      2. form that had init -> change stuff -> reset
      check that both result the same public form after the action */
      expect(publicForm).toEqual(formAfterFirstUnit);
    });

    it('reset persistent form - resets to the initial form after form had changes and refresh page (and went through init form)', async () => {
      delete commonForm.model.initializedData;
      let publicForm;
      let form = new Form();
      await form.init(commonForm.model, commonForm.resources, undefined, (x) => { publicForm = x; });
      const formAfterFirstUnit = publicForm;
      // change field value
      expect(form.data).toEqual({ name: 'Rachel', lastName: 'Green' });
      await form.changeValue('lastName', 'Geller');
      expect(form.data).toEqual({ name: 'Rachel', lastName: 'Geller' });
      // change ui
      expect(form.fields.lastName.component).toBeFalsy();
      await form.changeUi('lastName', { component: { name: 'inputText' } });
      expect(form.fields.lastName.component).toBeTruthy();
      // change state
      expect(form.fields.name.component.state).toEqual({});
      await form.changeState('name', { test: 'mock-test' });
      expect(form.fields.name.component.state).toEqual({ test: 'mock-test' });
      // mock refresh page - init the form with the persistent model
      const formBeforeRefresh = publicForm;
      form = new Form();
      await form.init(publicForm.model, commonForm.resources, undefined, (x) => { publicForm = x; });
      // verify persistent form loaded ok
      expect(publicForm.model).toEqual(formBeforeRefresh.model);
      // reset
      await form.reset();
      // verify form reset to the state it was after first init 
      expect(publicForm.model).toEqual(formAfterFirstUnit.model);
    });
  });

  describe('validators', () => {
    it('should make form valid on sync validator success', async () => {
      const form = new Form();
      await form.init(syncValidatorForm.model, syncValidatorForm.resources);
      expect(form.data).toEqual({});
      await form.changeValue('name', 'Moshe');
      expect(form.data).toEqual({
        name: 'Moshe',
      });
      expect(form.invalid).toBeFalsy();
    });
    
    it('should make form invalid on sync validator fails', async () => {
      const form = new Form();
      await form.init(syncValidatorForm.model, syncValidatorForm.resources);
      expect(form.data).toEqual({});

      // gal is unique name that is already taken - suppose to fail
      await form.changeValue('name', 'Gal');
      expect(form.data).toEqual({
        name: 'Gal',
      });
      expect(form.invalid).toBeTruthy();
      expect(form.fields.name.errors).toEqual([{
        name: 'uniqueName',
        message: 'Name should be unique',
      }]);
    });

    it('should make form invalid on async validator fails', async () => {
      const form = new Form();
      await form.init(asyncValidatorForm.model, asyncValidatorForm.resources);
      expect(form.data).toEqual({});

      // gal is unique name that is already taken - suppose to fail
      await form.changeValue('name', 'Gal');

      expect(form.data).toEqual({
        name: 'Gal',
      });
      expect(form.invalid).toBeTruthy();
      expect(form.fields.name.errors).toEqual([{
        name: 'uniqueName',
        message: 'Name should be unique',
      }]);
    });

    it('should make form invalid on async validator fails with debounce usage inside changeValue', async () => {
      const form = new Form();
      await form.init(asyncValidatorForm.model, asyncValidatorForm.resources);
      expect(form.data).toEqual({});

      // gal is unique name that is already taken - suppose to fail
      const change1 = form.changeValue('name', 'Gal');
      const change2 = form.changeValue('lastName', 'Havivi');
      await Promise.all([change1, change2]);

      expect(form.data).toEqual({
        name: 'Gal',
        lastName: 'Havivi',
      });
      expect(form.invalid).toBeTruthy();
    });

    it('field with exclude term and required=true, when its excluded - its should be keep required value', async () => {
      const form = new Form();
      simpleForm.model.data = { name: 'Custom' };
      simpleForm.model.fields.lastName.required = true;
      simpleForm.model.fields.lastName.dependencies = ['name'];
      simpleForm.model.fields.lastName.excludeTerm = {
        not: true,
        name: 'equals',
        args: { fieldId: 'name', value: 'Custom' }
      },
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.fields.lastName.excluded).toBeFalsy();
      expect(form.fields.lastName.required).toBeTruthy();
      expect(form.fields.lastName.empty).toBeTruthy();
      expect(form.fields.lastName.errors[0].name).toEqual('required');

      // change value - to exclude the field
      await form.changeValue('name', 'mock');
      expect(form.fields.lastName.excluded).toBeTruthy();
      expect(form.fields.lastName.required).toBeTruthy();
      expect(form.fields.lastName.empty).toBeFalsy();
      expect(form.fields.lastName.errors).toEqual([]);

      // change value - to include the field
      await form.changeValue('name', 'Custom');
      expect(form.fields.lastName.excluded).toBeFalsy();
      expect(form.fields.lastName.required).toBeTruthy();
      expect(form.fields.lastName.empty).toBeTruthy();
      expect(form.fields.lastName.errors[0].name).toEqual('required');
    });    
  });

  describe('dirty', () => {
    it('should make form dirty', async () => {
      const form = new Form();
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.data).toEqual({});
      expect(form.dirty).toBeFalsy();
      await form.changeValue('name', 'Moshe');
      expect(form.data).toEqual({
        name: 'Moshe',
      });
      expect(form.dirty).toBeTruthy();
    });

    it('should make form dirty and then not dirty', async () => {
      const form = new Form();
      simpleForm.model.data = { name: 'Assaf' };
      await form.init(simpleForm.model, simpleForm.resources);
      expect(form.dirty).toBeFalsy();
      expect(form.data).toEqual({ name: 'Assaf' });
      await form.changeValue('name', 'Moshe');
      expect(form.data).toEqual({
        name: 'Moshe',
      });
      expect(form.dirty).toBeTruthy();
      await form.changeValue('name', 'Assaf');
      expect(form.data).toEqual({
        name: 'Assaf',
      });
      expect(form.dirty).toBeFalsy();
    });
  });
});

const wait = async milliseconds => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, milliseconds);
});
