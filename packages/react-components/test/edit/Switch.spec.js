/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React from 'react';
import { mount, shallow } from 'enzyme';
import Switch from '../../src/edit/Switch/index';

describe('<Switch />', () => {
  let component;
  let onValueChangeSpy;
  const value = true;
  const disabled = false;
  const state = { };

  beforeEach(() => {
    onValueChangeSpy = jest.fn();
  });

  it('should render provided data', () => {
    component = shallow(
      getComponent(value, state, disabled, onValueChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('should trigger onValueChange callback on value change', () => {
    component = mount(
      getComponent(value, state, disabled, onValueChangeSpy)
    );
    const newValue = false;
    component.find('input').simulate('change', { target: { checked: newValue } });
    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, onValueChange) {
    return (
      <Switch
        value={value}
        state={state}
        disabled={disabled}
        onValueChange={onValueChange}
      />
    );
  }
});
