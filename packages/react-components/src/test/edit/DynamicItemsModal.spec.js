/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { FormContext, Field } from '@jafar/react-form';
import InputText from '../../components/edit/Text';
import DynamicItemsModal from '../../components/edit/DynamicItemsModal/index';

describe('<DynamicItemsModal />', () => {
  let component;
  let onValueChangeSpy;
  let onStateChangeSpy;
  let value;
  let state;
  let model;
  let resources;
  beforeEach(() => {
    onValueChangeSpy = jest.fn();
    onStateChangeSpy = jest.fn();
    value = [];
    state = {
      resourceId: 'employeesItems',
      addButtonLabel: 'Add New',
      addModalTitle: 'Add employee',
      editModalTitle: 'Edit employee',
    };
    model = {
      id: 'company',
      fields: {
        employees: {
          label: 'Employees',
          path: 'employees',
          component: {
            name: 'DynamicItemsModal',
            state: {
              resourceId: 'employeesItems',
              addButtonLabel: 'Add New',
              addModalTitle: 'Add employee',
              editModalTitle: 'Edit employee',
            },
          },
        },
      },
    };
    resources = {
      components: { DynamicItemsModal },
      employeesItems: {
        form: { // form
          model: {
            id: 'employees',
            fields: { 
              firstName: {
                label: 'First name',
                path: 'firstName',
                component: {
                  name: 'InputText',
                },
                required: true,
              },
              lastName: {
                label: 'Last name',
                path: 'lastName',
                component: {
                  name: 'InputText',
                },
                required: true,
              },
            },
          },
          resources: {
            components: { InputText },
          },
        },
        item: { // react-layout item
          title: 'Simple',
          sections: [{ 
            id: 'Add employee', 
            boxes: [{
              direction: 'column',
              boxes: [{
                component: Field,
                props: { id: 'firstName' },
              }, {
                component: Field,
                props: { id: 'lastName' },
              }],
            }],
          }],
        },
        itemRenderer: (item) => (<span>{item.firstName} - {item.lastName}</span>),
      },
    };
  });

  it('should render provided data', () => {
    component = render(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
    expect(component).toMatchSnapshot();
  });
  describe('component functions', () => {
    it('call open method', () => {
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.open();
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        addButtonLabel: 'Add New',
        addModalTitle: 'Add employee',
        editModalTitle: 'Edit employee', 
        isOpen: true,
        resourceId: 'employeesItems',
      });
      expect(instance.dialogTitle).toBe(state.addModalTitle);
    });
    it('call close method', () => {
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.close();
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        addButtonLabel: 'Add New',
        addModalTitle: 'Add employee',
        editModalTitle: 'Edit employee',  
        isEditMode: false,
        isOpen: false,
        resourceId: 'employeesItems',
      });
    });
    it('call add method, when adding new item', () => {
      const item = { firstName: 'first', lastName: 'last' };
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.add(item);
      expect(onValueChangeSpy).toHaveBeenCalledWith([item]);
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        addButtonLabel: 'Add New',
        addModalTitle: 'Add employee',
        editModalTitle: 'Edit employee', 
        isEditMode: false,
        isOpen: false,
        resourceId: 'employeesItems',
      });
    });
    it('call add method, when editing new item', () => {
      const item = { firstName: 'edit first', lastName: 'edit last' };
      state.isEditMode = true; 
      state.editIndex = 0;
      value = [{ firstName: 'first', lastName: 'last' }];
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.add(item);
      expect(onValueChangeSpy).toHaveBeenCalledWith([item]);
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        addButtonLabel: 'Add New',
        addModalTitle: 'Add employee',
        editModalTitle: 'Edit employee',
        isEditMode: false,
        isOpen: false,
        resourceId: 'employeesItems',
      });
    });
    it('call edit method', () => {
      value = [{ firstName: 'first', lastName: 'last' }];
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.edit(0);
      expect(instance.context.resources.employeesItems.form.model.data).toEqual(value[0]);
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        addButtonLabel: 'Add New',
        addModalTitle: 'Add employee',
        editModalTitle: 'Edit employee',
        editIndex: 0,
        isEditMode: true,
        isOpen: true,
        resourceId: 'employeesItems',
      });
      expect(instance.dialogTitle).toBe(state.editModalTitle);
    });
    it('call remove method', () => {
      value = [{ firstName: 'first', lastName: 'last' }];
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      instance.remove(0);
      expect(onValueChangeSpy).toHaveBeenCalledWith([]);
    });
    it('render itemsDisplay', () => {
      value = [{ firstName: 'first', lastName: 'last' }];
      component = mount(getComponent(value, state, onStateChangeSpy, onValueChangeSpy, model, resources));
      const instance = component.instance();
      const itemsDisplay = instance.renderItemsDisplay(); 
      expect(shallow(itemsDisplay)).toMatchSnapshot();
    });
  });
  function getComponent(value, state, onStateChange, onValueChange, model, resources) {
    return (<FormContext.Provider value={{ model, resources }}>
      <DynamicItemsModal 
        value={value}
        state={state}
        onStateChange={onStateChange}
        onValueChange={onValueChange} />
    </FormContext.Provider>);
  }
});
