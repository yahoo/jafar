/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount, shallow } from 'enzyme';
import AsyncSelect from '../../src/edit/AsyncSelect/index';

describe('<AsyncSelect />', () => {
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
    value = { value: 'ocean', label: 'Ocean' };
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
      <AsyncSelect
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
