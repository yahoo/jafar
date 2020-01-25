/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Options from '../components/Options/index';

describe('Options', () => {
  let props;

  beforeEach(() => {
    props = {
      options: [{
        label: 'Archive',
        onClick: jest.fn(),
      }],
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render - with action that has disabled truthy - ok', () => {
    props.options[0].disabled = true;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Options {...props} />);
  }
});
