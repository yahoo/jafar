/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Password from '../../edit/Password/index';

describe('<Password />', () => {
  let component;
  let onValueChangeSpy;
  const value = 'secretPassword';
  const disabled = false;
  const invalid = false;
  const state = { };

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
    const newValue = 'newPassword';
    component.find('input').simulate('change', { target: { value: newValue } });
    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, invalid, onValueChange) {
    return (
      <Password
        value={value}
        state={state}
        disabled={disabled}
        invalid={invalid}
        onValueChange={onValueChange}
      />
    );
  }
});
