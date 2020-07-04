/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { cloneDeep } from 'lodash';
import { createForm } from '../src/index';
import formMock from './mocks/common';

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

  describe('createForm', () => {
    it('return expected form with undefined args', () => {
      const { model: newModel, resources: newResources, settings: newSettings } = createForm();

      // verify model
      expect(newModel.initialModel).toEqual({
        context: {},
        data: {},
        dirty: false,
        errors: {},
        fields: {},
        id: 'form-1',
        initializedData: undefined,
        invalid: false,
        pendingActions: [],
        prevData: undefined,
        processing: false,
      });
      expect(newModel.id).toEqual('form-1');
      expect(newModel.initializedData).toEqual(undefined);
      expect(newModel.prevData).toEqual(undefined);
      expect(newModel.data).toEqual({});
      expect(newModel.context).toEqual({});
      expect(newModel.fields).toEqual({});
      expect(newModel.context).toEqual({});
      expect(newModel.invalid).toEqual(false);
      expect(newModel.dirty).toEqual(false);
      expect(newModel.errors).toEqual({});
      expect(newModel.processing).toEqual(false);
      expect(newModel.pendingActions).toEqual([]);

      // verify resources
      expect(newResources.components).toEqual({});
      expect(newResources.dependenciesChanges).toEqual({});
      expect(Object.keys(newResources.validators).length > 0).toBeTruthy();
      expect(Object.keys(newResources.conversions).length > 0).toBeTruthy();
      expect(Object.keys(newResources.terms).length > 0).toBeTruthy();
      expect(Object.keys(newResources.hooks)).toHaveLength(28);

      // verify settings
      expect(newSettings).toEqual({
        changeValueDebounceWait: 250,
        changeValueDebounceMaxWait: 60000,
        changeStateDebounceWait: 250,
        changeStateDebounceMaxWait: 60000,
      });
    });

    it('return expected form', () => {
      // custom user data in the model and resources - pass to the final model / resources
      resources.extra = { myExtraData: 'myExtraData' }; // any additional data
      model.extra = { myExtraData: 'myExtraData' }; // any additional data
      model.predData = { name: 'rachel' };
      model.initializedData = { name: 'rachel2' };
      model.invalid = true;
      model.dirty = true;
      const expectedFields = cloneDeep(model.fields);
      Object.assign(expectedFields.name, {
        dirty: false,
        required: true,
        disabled: false,
        excluded: false,
        invalid: false,
        empty: false,
        formatter: model.fields.name.formatter,
        parser: model.fields.name.parser,
      });
      Object.assign(expectedFields.lastName, {
        disabled: false,
        excluded: false,
        dirty: false,
        required: false,
        empty: false,
        invalid: false,
        errors: [],
        component: undefined,
        formatter: undefined,
        parser: undefined,
      });
      Object.assign(expectedFields.name.component, { state: {}, prevState: undefined });

      // verify model
      const { model: newModel, resources: newResources, settings: newSettings } = createForm(model, resources, settings);
      const expectedInitialModel = Object.assign({}, newModel, { initialModel: undefined });
      expect(newModel.initialModel).toEqual(expectedInitialModel);
      expect(newModel.id).toEqual(model.id);
      expect(newModel.initializedData).toEqual(newModel.initializedData);
      expect(newModel.prevData).toEqual(model.prevData);
      expect(newModel.data).toEqual(model.data);
      expect(newModel.context).toEqual(model.context);
      expect(newModel.fields).toEqual(expectedFields);
      expect(newModel.invalid).toEqual(true);
      expect(newModel.dirty).toEqual(true);
      expect(newModel.errors).toEqual({});
      expect(newModel.processing).toEqual(false);
      expect(newModel.pendingActions).toEqual([]);
      expect(newModel.extra).toEqual(model.extra);

      // verify resource
      expect(newResources.components).toEqual(resources.components);
      expect(newResources.dependenciesChanges).toEqual(resources.dependenciesChanges);
      expect(Object.keys(newResources.validators).length > Object.keys(resources.validators).length).toBeTruthy();
      expect(Object.keys(newResources.conversions).length > Object.keys(resources.conversions).length).toBeTruthy();
      expect(Object.keys(newResources.terms).length > Object.keys(resources.terms).length).toBeTruthy();
      expect(Object.keys(newResources.hooks)).toHaveLength(28);
      expect(newResources.hooks.afterChangeData).toEqual(resources.hooks.afterChangeData);
      expect(newResources.extra).toEqual(resources.extra);

      // verify settings
      expect(newSettings).toEqual({
        changeValueDebounceWait: 200,
        changeValueDebounceMaxWait: 30000,
        changeStateDebounceWait: 200,
        changeStateDebounceMaxWait: 30000,
      });
    });

    it('return expected form - field excluded / disabled / required when terms provided', () => {
      const term = { name: 'equals', args: { fieldId: 'lastName', value: 'green' } };
      model.fields.name.excluded = undefined;
      model.fields.name.excludeTerm = term;
      model.fields.name.disabled = undefined;
      model.fields.name.disableTerm = term;
      model.fields.name.required = undefined;
      model.fields.name.requireTerm = term;
      // verify model
      const { model: newModel } = createForm(model, resources);
      expect(newModel.fields.name.excluded).toEqual(true);
      expect(newModel.fields.name.disabled).toEqual(true);
      expect(newModel.fields.name.required).toEqual(true);
    });

    it('return expected form - field excluded / disabled / required when excluded / disabled / required provided', () => {
      const term = { name: 'equals', args: { fieldId: 'lastName', value: 'green' } };
      model.fields.name.excluded = true;
      model.fields.name.excludeTerm = term;
      model.fields.name.disabled = false;
      model.fields.name.disableTerm = term;
      model.fields.name.required = false;
      model.fields.name.requireTerm = term;
      // verify model
      const { model: newModel } = createForm(model, resources);
      expect(newModel.fields.name.excluded).toEqual(true);
      expect(newModel.fields.name.disabled).toEqual(false);
      expect(newModel.fields.name.required).toEqual(false);
    });
    it('return expected field persistent data', () => {
      const expectedField = cloneDeep(model.fields.lastName);
      const errors = [{ name: 'a', message: 'b' }];
      const overrides = {
        disabled: true,
        excluded: true,
        dirty: true,
        required: true,
        empty: true,
        invalid: true,
        errors,
      };
      Object.assign(model.fields.lastName, overrides);
      Object.assign(expectedField, overrides);

      // verify field flags didnt change
      const createdForm = createForm(model, resources);
      
      expect(createdForm.model.fields.lastName).toEqual(expectedField);
    });
  });
});
