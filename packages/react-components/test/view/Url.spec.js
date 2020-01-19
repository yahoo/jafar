/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Url from '../../src/view/Url/index';

describe('<Url />', () => {
  let component;
  const value = 'https://www.facebook.com/friends.tv/';

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
      <Url value={value} />
    );
  }
});
