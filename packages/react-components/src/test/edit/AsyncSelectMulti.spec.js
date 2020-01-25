/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import AsyncMultiSelect from '../../edit/AsyncMultiSelect/index';

describe('<AsyncMultiSelect />', () => {
  let component;
  let onValueChangeSpy;
  let onStateChangeSpy;
  let state;
  let value;
  let disabled;
  let required;

  beforeEach(() => {
    onValueChangeSpy = jest.fn();
    onStateChangeSpy = jest.fn();
    value = [{ value: 'ocean', label: 'Ocean' }];
    disabled = false;
    required = false;
    state = { 
      options:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    };
  });

  it('Should render provided data', () => {
    component = shallow(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render provided data - disabled', () => {
    disabled = true;
    component = shallow(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render provided data - required', () => {
    required = true;
    component = shallow(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('onValueChange - new value defined - ok', () => {
    component = mount(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    const controller = component.instance();
    const newValue = [{ value: 'purple', orgValue: 'purple', label: 'Purple' }];
    const expectedValue = [{ value: 'purple', label: 'Purple' }];
    controller.onValueChange(newValue);
    expect(onValueChangeSpy).toHaveBeenCalledWith(expectedValue);
  });

  it('onValueChange - new value undefined - ok', () => {
    component = mount(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    const controller = component.instance();
    const newValue = undefined;
    controller.onValueChange(newValue);
    expect(onValueChangeSpy).toHaveBeenCalledWith(undefined);
  });

  it('onSearchChange - ok', () => {
    component = mount(
      getComponent(value, state, disabled, required, onValueChangeSpy, onStateChangeSpy)
    );
    const controller = component.instance();
    const query = 'pu';
    controller.onSearchChange(query);
    const expectedState = state;
    expectedState.searchQuery = query;
    expect(onStateChangeSpy).toHaveBeenCalledWith(expectedState);
  });

  function getComponent(value, state, disabled, required, onValueChange, onStateChange) {
    return (
      <AsyncMultiSelect
        value={value}
        state={state}
        disabled={disabled}
        required={required}
        onValueChange={onValueChange}
        onStateChange={onStateChange}
      />
    );
  }
});
