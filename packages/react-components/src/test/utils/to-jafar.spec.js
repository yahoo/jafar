/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Input from '@material-ui/core/Input';
import { toJafar } from '../../components/utils/index';


describe('toJafar', () => {
  const mapper = ({ value, state, disabled, onValueChange }) => ({
    type: state.type,
    placeholder: state.placeholder,
    value,
    disabled,
    onChange: event => onValueChange(event.target.checked),
  });

  const mockJafarProps = {
    value: 'Rachel Green',
    disabled: true,
    state: {
      type: 'text',
      placeholder: 'Enter name...',
    },
    onValueChange: jest.fn(),
  };

  const expectedInputProps = {
    type: mockJafarProps.state.type,
    placeholder: mockJafarProps.state.placeholder,
    value: mockJafarProps.value,
    disabled: mockJafarProps.disabled,
    onChange: expect.any(Function),
  };

  it('should return correct component', () => {
    const JafarInput = toJafar(Input, mapper);
    const rendered = shallow(<JafarInput {...mockJafarProps} />);
    expect(rendered.props()).toEqual(expectedInputProps);
  });
});
 
