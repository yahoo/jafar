/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckboxCollection from '../../edit/CheckboxCollection/internal/CheckboxCollection/index';

describe('<CheckboxCollection />', () => {
  let component;
  let onChangeSpy;
  let onSearchChangeSpy;
  const value = ['1', '2'];
  const items = [
    {
      value: '1',
      label: 'Ross Geller',
    },
    {
      value: '2',
      label: 'Monica Geller',
    },
    {
      value: '3',
      label: 'Rachel Green',
    },
    {
      value: '4',
      label: 'Chandler Bing',
    },
    {
      value: '5',
      label: 'Joey Tribbiani',
    },
    {
      value: '6',
      label: 'Phoebe Buffay',
    },
  ];
  let disabled;
  let inline;
  let search;

  beforeEach(() => {
    disabled = false;
    inline = false;
    search = undefined;
    onChangeSpy = jest.fn();
    onSearchChangeSpy = jest.fn();
  });

  describe('should render provided data', () => {
    it('checkboxes only', () => {
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes inline', () => {
      inline = true;
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes disabled', () => {
      disabled = true;
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes with search', () => {
      search = { value: 'geller', placeholder: 'Search' };
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      expect(component).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate check', () => {
    it('return true - when nextProps are not equals to currProps', () => {
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      const nextProps = {};
      expect(component.instance().shouldComponentUpdate(nextProps)).toBeTruthy();
    });

    it('return false - when nextProps are equals to currProps', () => {
      component = shallow(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
      const nextProps = {
        value, items, disabled, inline, search, onChange: onChangeSpy, onSearchChange: onSearchChangeSpy,
      };
      expect(component.instance().shouldComponentUpdate(nextProps)).toBeFalsy();
    });
  });

  describe('should trigger', () => {
    beforeEach(() => {
      search = { value: '', placeholder: 'Search' };
      component = mount(getComponent(value, items, disabled, inline, search, onChangeSpy, onSearchChangeSpy));
    });

    it('onSearchChange callback on search value change', () => {
      const newValue = 'banana';
      component
        .find('input[type="search"]')
        .simulate('change', { target: { value: newValue } });
      expect(onSearchChangeSpy).toHaveBeenCalledWith(newValue);
    });

    it('onChange callback on checkbox checked', () => {
      component.find('[value="3"] input[type="checkbox"]').simulate('change', {
        target: { value: '3', checked: true },
      });
      expect(onChangeSpy).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('onChange callback on checkbox unchecked', () => {
      component.find('[value="3"] input[type="checkbox"]').simulate('change', {
        target: { value: '2', checked: false },
      });
      expect(onChangeSpy).toHaveBeenCalledWith(['1']);
    });
  });

  function getComponent(value, items, disabled, inline, search, onChange, onSearchChange) {
    return (
      <CheckboxCollection value={value} items={items} disabled={disabled} inline={inline} search={search}
        onChange={onChange} onSearchChange={onSearchChange} />);
  }
});
