/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Box from '../src/components/Box/index';

describe('Box', () => {
  const Field = () => {};

  it('Should render component - ok', () => {
    const box = {
      component: () => {},
      props: { id: 'firstName' },
    };
    const component = shallow(getComponent(box));
    expect(component).toMatchSnapshot();
  });
  it('Should render row - ok', () => {
    const box = {
      direction: 'row',
      boxes: [{
        component: Field,
        props: { id: 'firstName' },
      }, {
        component: Field,
        props: { id: 'lastName' },
      }],
    };
    const component = shallow(getComponent(box));
    expect(component).toMatchSnapshot();
  });

  it('Should render column, ok', () => {
    const box = {
      direction: 'column',
      boxes: [{
        component: Field,
        props: { id: 'firstName' },
      }, {
        component: Field,
        props: { id: 'lastName' },
      }],
    };
    const component = shallow(getComponent(box));
    expect(component).toMatchSnapshot();
  });

  it('Should render nested content, ok', () => {
    const content = {
      direction: 'row',
      content: [{
        direction: 'column',
        boxes: [{
          component: Field,
          props: { id: 'firstName' },
        }, {
          component: Field,
          props: { id: 'lastName' },
        }],
      }, {
        direction: 'column',
        boxes: [{
          component: Field,
          props: { id: 'address' },
        }],
      }],
    };
    const component = shallow(getComponent(content));
    expect(component).toMatchSnapshot();
  });

  it('Should render with style, ok', () => {
    const box = {
      direction: 'column',
      style: {
        width: '300px',
        maxWidth: '500px',
        margin: '10px 20px',
      },
      boxes: [{
        component: Field,
        props: { id: 'firstName' },
      }, {
        component: Field,
        props: { id: 'lastName' },
      }],
    };
    const component = shallow(getComponent(box));
    expect(component).toMatchSnapshot();
  });

  function getComponent(props) {
    return (<Box {...props} />);
  }
});
