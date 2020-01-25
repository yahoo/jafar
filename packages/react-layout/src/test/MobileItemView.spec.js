/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import MobileItemView from '../components/MobileItemView/index';

describe('MobileItemView', () => {
  const optionsSelector = 'aria-label="Options"';
  let props;

  beforeEach(() => {
    props = {
      title: 'Employee',
      sections: [{
        id: 'general',
        title: 'General',
      }],
      mainActions: [{
        label: 'Save',
        icon: () => <svg />,
        type: 'primary',
        onClick: jest.fn(),
      }],
      optionsActions: [{
        label: 'History',
        onClick: jest.fn(),
      }],
    };
  });

  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });

  it('Should render without title - ok', () => {
    props.title = undefined;
    const component = shallow(getComponent(props));
    const html = component.html();
    expect(html).toContain(optionsSelector);
    expect(html).not.toContain(props.title);
    expect(html).toContain(props.mainActions[0].label);
  });

  it('Should render without mainActions - ok', () => {
    const mainActionIcon = props.mainActions[0].label;
    props.mainActions = undefined;
    const component = shallow(getComponent(props));
    const html = component.html();
    expect(html).toContain(optionsSelector);
    expect(html).toContain(props.title);
    expect(html).not.toContain(mainActionIcon);
  });

  it('Should render without optionsActions - ok', () => {
    props.optionsActions = undefined;
    const component = shallow(getComponent(props));
    const html = component.html();
    expect(html).not.toContain(optionsSelector);
    expect(html).toContain(props.title);
    expect(html).toContain(props.mainActions[0].label);
  });

  it('Should render with only optionsActions - ok', () => {
    const mainActionIcon = props.mainActions[0].label;
    props.title = undefined;
    props.mainActions = undefined;
    const component = shallow(getComponent(props));
    const html = component.html();
    expect(html).toContain(optionsSelector);
    expect(html).not.toContain(props.title);
    expect(html).not.toContain(mainActionIcon);
  });

  function getComponent(props) {
    return (<MobileItemView {...props} />);
  }
});
