/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Item from '../src/components/ItemView/index';

describe('ItemView', () => {
  let props;

  beforeEach(() => {
    props = {
      title: 'Employee',
      sections: [{
        id: 'general',
      }],
      tabs: {
        items: [{
          value: 'general',
          label: 'General',
        }],
        value: undefined,
        onChange: jest.fn(),
      },
      footer: {
        actions: [],
      },
      options: {
        actions: [],
      },
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render without title - ok', () => {
    props.title = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render without tabs - ok', () => {
    props.tabs = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render without footer - ok', () => {
    props.footer = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render without options - ok', () => {
    props.options = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render header options only - ok', () => {
    props.tabs = undefined;
    props.title = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Item {...props} />);
  }
});
