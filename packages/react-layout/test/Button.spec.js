/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Button from '../src/components/Button/index';

describe('Button', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'save',
      onClick: () => {},
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render - disabled truthy, render ok', () => {
    props.disabled = true;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render with custom button component', () => {
    props.component = props => (<span>Custom</span>);
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Button {...props} />);
  }
});
