/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Select from '@material-ui/core/Select';
import Dropdown from '../../edit/Dropdown/index';


describe('<Dropdown />', () => {
  let component;
  let onValueChangeSpy;
  const value = 'FOOTBALL';
  const state = {
    items: [{
      value: 'BASKETBALL',
      label: 'Basketball',
    }, {
      value: 'FOOTBALL',
      label: 'Football',
    }, {
      value: 'SHOP',
      label: 'Shop',
    }, {
      value: 'FASHION',
      label: 'Fashion',
    }, {
      value: 'COOK',
      label: 'Cook',
    }],
  };
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
    const newValue = 'FASHION';
    const stringifiedNewValue = JSON.stringify(newValue); // value is stringify in the component
    component.find(Select).at(0).props().onChange({ target: { value: stringifiedNewValue } });
    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, invalid, onValueChange) {
    return (
      <Dropdown
        value={value}
        state={state}
        disabled={disabled}
        invalid={invalid}
        onValueChange={onValueChange}
      />
    );
  }
});
