/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from '../../edit/Checkbox/index';

describe('<Checkbox />', () => {
  let component;
  let onValueChangeSpy;
  const value = false;
  const state = { label: 'Click me' };
  const disabled = false;

  beforeEach(() => {
    onValueChangeSpy = jest.fn();
  });

  it('should render provided data', () => {
    component = shallow(
      getComponent(value, state, disabled, onValueChangeSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('should trigger onValueChange callback on check change', () => {
    component = mount(
      getComponent(value, state, disabled, onValueChangeSpy)
    );
    const newValue = true;
    component.find('input[type="checkbox"]').simulate('change', {
      target: { checked: newValue },
    });

    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, onValueChange) {
    return (
      <Checkbox
        value={value}
        state={state}
        disabled={disabled}
        onValueChange={onValueChange}
      />
    );
  }
});
