/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React from 'react';
import { mount, shallow } from 'enzyme';
import Url from '../../components/edit/Url/index';

describe('<Url />', () => {
  let component;
  let onValueChangeSpy;
  const value = 'http://test.com';
  const state = { placeholder: 'Enter URL' };
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
    const newValue = 'http://test-new.com';
    component.find('input').simulate('change', { target: { value: newValue } });
    expect(onValueChangeSpy).toHaveBeenCalledWith(newValue);
  });

  function getComponent(value, state, disabled, invalid, onValueChange, multiline) {
    return (
      <Url
        value={value}
        state={state}
        disabled={disabled}
        invalid={invalid}
        onValueChange={onValueChange}
      />
    );
  }
});
