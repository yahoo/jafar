/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Item from '../components/Item';
 
describe('Item', () => {
  let props;
 
  beforeEach(() => {
    props = {
      title: 'Employee',
      sections: [{
        id: 'general',
        title: 'General',
      }],
      layout: 'scroll',
      mainActions: [],
      optionsActions: [],
    };
  });
  it('Should render - ok', () => {
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with layout tabs - ok', () => {
    props.layout = 'tabs';
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with layout mobile - ok', () => {
    props.layout = 'mobile';
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without layout - ok', () => {
    props.layout = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without title - ok', () => {
    props.title = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with all filtered sections - ok', () => {
    props.sections[0].exclude = () => true;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without mainActions - ok', () => {
    props.mainActions = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render with mainActions - popover - ok', () => {
    props.mainActions = [{
      label: 'Save & Close',
      type: 'secondary',
      disable: () => false,
      onClick: jest.fn(),
    }, {
      label: 'Save',
      type: 'primary',
      icon: () => null,
      disable: () => false,
      onClick: jest.fn(),
      popover: {
        title: 'Handle Fields',
        open: () => false,
        component: () => (<div>hi</div>),
        props: { onClickField: jest.fn() },
      },
    }];
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('Should render without optionsActions - ok', () => {
    props.optionsActions = undefined;
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('getDerivedStateFromProps - selected defined', () => {
    props.selected = { sectionId: 'general' };
    const component = shallow(getComponent(props));
    expect(component).toMatchSnapshot();
  });
 
  it('getDerivedStateFromProps - return need scroll', () => {
    props.selected = { sectionId: 'general' };
    const state = {};
    const result = Item.getDerivedStateFromProps(props, state);
    expect(result).toEqual({
      needScroll: true,
      selected: props.selected,
      prevSelected: props.selected,
    });
  });
 
  it('onChangeTab - scroll to element', () => {
    props.layout = 'tabs';
    props.selected = { sectionId: 'general', elementId: 'a' };
    const component = shallow(getComponent(props));
    const element = {
      scrollIntoView: jest.fn(),
      querySelector: jest.fn(x => ({ offsetTop: 200 })),
      offsetTop: 150,
    };
    const instance = component.instance();
    instance.state = {
      needScroll: true,
      selected: props.selected,
      prevSelected: props.selected,
    };
    instance.sectionsRefs.general.current = element;
    instance.onChangeTab({}, 'general');
    expect(element.scrollIntoView).not.toHaveBeenCalled();
  });
 
  function getComponent(props) {
    return (<Item {...props} />);
  }
});
 
