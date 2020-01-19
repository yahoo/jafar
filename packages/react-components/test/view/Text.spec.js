/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../src/view/Text/index';

describe('<Text />', () => {
  let component;
  const value = 'avocado';

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
      <Text value={value} />
    );
  }
});
