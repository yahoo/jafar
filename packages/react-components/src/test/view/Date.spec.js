/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import DateView from '../../components/view/Date';

describe('<Date />', () => {
  let component;
  const value = new Date('Thu, 16 Jan 2020 08:27:07 GMT');

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
      <DateView value={value} />
    );
  }
});
