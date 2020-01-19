/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../../src/edit/RadioGroup/index';

describe('<RadioGroup />', () => {
  let component;
  let onValueChangeSpy;
  const value = 'value2';
  const state = {
    items: [
      { label: 'label 1', value: 'value1' },
      { label: 'label 2', value: 'value2' },
      { label: 'label 3', value: 'value3' }],
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

  function getComponent(value, state, disabled, invalid, onValueChange) {
    return (
      <RadioGroup
        value={value}
        state={state}
        disabled={disabled}
        invalid={invalid}
        onValueChange={onValueChange}
      />
    );
  }
});
