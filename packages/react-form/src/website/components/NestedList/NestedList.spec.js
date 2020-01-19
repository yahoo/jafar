/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import NestedList from './index';

describe('<NestedList />', () => {
  let menu;
  let selected;
  let onItemClickSpy;

  beforeEach(() => {
    menu = [{
      id: '/react',
      label: 'React',
      items: [{
        id: '/react/simple',
        label: 'Simple',
      }],
    }, {
      id: '/react-redux',
      label: 'React Redux',
      items: [{
        id: '/react-redux/simple',
        label: 'Simple',
      }],
    }];
    selected = undefined;
    onItemClickSpy = jest.fn();
  });

  describe('should render provided data', () => {
    it('selected undefined', () => {
      const component = shallow(getComponent(menu, selected, onItemClickSpy));
      expect(component).toMatchSnapshot();
    });

    it('selected defiend', () => {
      const selected = menu[0].items[0];
      const component = shallow(getComponent(menu, selected, onItemClickSpy));
      expect(component).toMatchSnapshot();
    });
  });

  describe('should trigger', () => {
    let component;
    beforeEach(() => {
      component = mount(getComponent(menu, selected, onItemClickSpy, true));
    });

    it('onItemClick callback - called on click leaf item', () => {
      // open first expandable item
      component
        .find('[role="button"]').first()
        .simulate('click', {});

      // click on it first child (leaf child)
      component
        .find('[role="button"]').at(1)
        .simulate('click', {});

      expect(onItemClickSpy).toHaveBeenCalledWith(menu[0].items[0]);
    });
    it('onItemClick callback - not called on click non-leaf item', () => {
      component
        .find('[role="button"]').first()
        .simulate('click', {});

      expect(onItemClickSpy).not.toHaveBeenCalled();
    });
  });

  function getComponent(menu, selected, onItemClick, wrapWithRoute = false) {
    const nestedInstance = (<NestedList menu={menu} selected={selected} onItemClick={onItemClick} />);
    return wrapWithRoute ? (<Router>{nestedInstance}</Router>) : nestedInstance;
  }
});
