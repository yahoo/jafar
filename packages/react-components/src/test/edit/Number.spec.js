/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Number from '../../edit/Number/index';

describe('<Number />', () => {
  let component;
  let onValueChangeSpy;
  const value = 42;
  const state = { placeholder: 'Enter Number' };
  const disabled = false;
  const invalid = false;

  beforeEach(() => {
    onValueChangeSpy = jest.fn();
  });

  it('should render provided data', () => {
    component = shallow(
      getComponent(value, state, disabled, invalid, onValueChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('should trigger onValueChange callback on value change', () => {
    component = mount(
      getComponent(value, state, disabled, invalid, onValueChangeSpy)
    );
    const newValue = 43;
    component.find('input').simulate('change', { target: { value: newValue } });
    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, invalid, onValueChange) {
    return (
      <Number
        value={value}
        state={state}
        disabled={disabled}
        invalid={invalid}
        onValueChange={onValueChange}
      />
    );
  }
});
