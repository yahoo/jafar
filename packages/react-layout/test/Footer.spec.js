/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../src/components/Footer/index';

describe('Footer', () => {
  let props;

  beforeEach(() => {
    props = {
      actions: [{
        type: 'secondary',
        label: 'Cancel',
        onClick: jest.fn(),
      }, {
        type: 'primary',
        label: 'Save',
        onClick: jest.fn(),
      }],
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Footer {...props} />);
  }
});
