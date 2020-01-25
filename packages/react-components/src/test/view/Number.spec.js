/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Number from '../../components/view/Number/index';

describe('<Number />', () => {
  let component;
  const value = 123456.674;
  const state = { fixed: 2 };

  beforeEach(() => {
    component = shallow(
      getComponent(value, state)
    );
  });
  it('should render provided data', () => {
    expect(component).toMatchSnapshot();
  });

  function getComponent(value) {
    return (
      <Number value={value} state={state} />
    );
  }
});
