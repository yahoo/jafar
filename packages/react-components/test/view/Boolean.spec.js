/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Boolean from '../../src/view/Boolean/index';

describe('<Boolean />', () => {
  let component;
  const value = true;

  beforeEach(() => {
    component = shallow(
      getComponent(value)
    );
  });
  it('should render provided data', () => {
    expect(component).toMatchSnapshot();
  });

  function getComponent(value) {
    return (
      <Boolean value={value} />
    );
  }
});
