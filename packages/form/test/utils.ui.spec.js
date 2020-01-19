/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { mapFieldToProps } from '../src/index';

describe('utils.ui', () => {
  describe('mapFieldToProps', () => {
    let model;
    let resources;
    let expectProps;
    const expectPropsExcluded = {
      id: 'lastName',
      excluded: true,
    };
    beforeEach(() => {
      model = {
        id: 'simple',
        fields: {
          name: {
            path: 'name',
            label: 'Name',
            description: 'Enter Name',
            required: false,
            empty: false,
            invalid: false,
            dirty: false,
            errors: [],
            component: { name: 'inputText', state: {}, value: 'Formatted Rachel' },
          },
        },
        data: { name: 'Rachel' },
      };
      resources = {
        components: {
          inputText: { rendered: 'someComponent' },
        },
      };
      const field = model.fields.name;
      expectProps = {
        id: 'name',
        label: field.label,
        description: field.description,
        value: field.component.value,
        component: resources.components[field.component.name].renderer,
        state: field.component.state,
        required: field.required,
        dirty: field.dirty,
        empty: field.empty,
        invalid: field.invalid,
        errors: field.errors,
        excluded: field.excluded,
        disabled: field.disabled,
      };
    });

    it('model undefined', () => {
      const props = mapFieldToProps('lastName', undefined);
      expect(props).toEqual(expectPropsExcluded);
    });
    it('field undefined', () => {
      const props = mapFieldToProps('lastName', model, resources);
      expect(props).toEqual(expectPropsExcluded);
    });

    it('props ok', () => {
      const props = mapFieldToProps('name', model, resources);
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - empty, required, invalid - set invalid false (required is not invalid in UX terms)', () => {
      model.fields.name.empty = true;
      model.fields.name.required = true;
      model.fields.name.invalid = true;
      model.fields.name.errors = [{ name: 'required', message: 'Field Required' }];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = true;
      expectProps.required = true;
      expectProps.invalid = false;
      expectProps.errors = [{ name: 'required', message: 'Field Required' }];
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - empty, not required', () => {
      model.fields.name.empty = true;
      model.fields.name.required = false;
      model.fields.name.invalid = false;
      model.fields.name.errors = [];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = true;
      expectProps.required = false;
      expectProps.invalid = false;
      expectProps.errors = [];
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - not empty, required, valid', () => {
      model.fields.name.empty = false;
      model.fields.name.required = true;
      model.fields.name.invalid = false;
      model.fields.name.errors = [];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = false;
      expectProps.required = true;
      expectProps.invalid = false;
      expectProps.errors = [];
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - not empty, required, invalid', () => {
      model.fields.name.empty = false;
      model.fields.name.required = true;
      model.fields.name.invalid = true;
      model.fields.name.errors = [{}];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = false;
      expectProps.required = true;
      expectProps.invalid = true;
      expectProps.errors = [{}];
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - not empty, not required, valid', () => {
      model.fields.name.empty = false;
      model.fields.name.required = false;
      model.fields.name.invalid = false;
      model.fields.name.errors = [];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = false;
      expectProps.required = false;
      expectProps.invalid = false;
      expectProps.errors = [];
      expect(props).toEqual(expectProps);
    });

    it('props ok, field - not empty, not required, invalid', () => {
      model.fields.name.empty = false;
      model.fields.name.required = false;
      model.fields.name.invalid = true;
      model.fields.name.errors = [{}];
      const props = mapFieldToProps('name', model, resources);
      expectProps.empty = false;
      expectProps.required = false;
      expectProps.invalid = true;
      expectProps.errors = [{}];
      expect(props).toEqual(expectProps);
    });
  });
});
