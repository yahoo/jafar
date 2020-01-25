/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React from 'react';
import { shallow } from 'enzyme';
import Popover from '../components/Popover/index';

describe('Popover', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'My Id',
      title: 'My Title',
      targetRef: { current: document.createElement('div') },
      open: () => true,
      component: () => <div>This is popover!</div>,
      styles: {},
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('elementRef.current null', () => {
    props.targetRef.current = null;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Popover {...props} />);
  }
});
