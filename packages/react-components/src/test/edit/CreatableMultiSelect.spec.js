/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import CreatableMultiSelect from '../../components/edit/CreatableMultiSelect/index';

describe('<CreatableMultiSelect />', () => {
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
    value = ['ocean'];
    disabled = false;
    required = false;
    state = { };
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
    const newValue = [{ value: 'purple', label: 'purple' }];
    controller.onValueChange(newValue);
    expect(onValueChangeSpy).toHaveBeenCalledWith(['purple']);
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

  function getComponent(value, state, disabled, required, onValueChange, onStateChange) {
    return (
      <CreatableMultiSelect
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
