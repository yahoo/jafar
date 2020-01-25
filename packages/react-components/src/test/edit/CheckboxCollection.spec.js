/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckboxCollection from '../../components/edit/CheckboxCollection/index';

describe('<CheckboxCollection />', () => {
  let component;
  let onValueChangeSpy;
  let onStateChangeSpy;
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
    onValueChangeSpy = jest.fn();
    onStateChangeSpy = jest.fn();
  });

  describe('should render provided data', () => {
    it('checkboxes only', () => {
      component = shallow(getComponent(value, items, disabled, inline, search, onValueChangeSpy, onStateChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes inline', () => {
      inline = true;
      component = shallow(getComponent(value, items, disabled, inline, search, onValueChangeSpy, onStateChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes disabled', () => {
      disabled = true;
      component = shallow(getComponent(value, items, disabled, inline, search, onValueChangeSpy, onStateChangeSpy));
      expect(component).toMatchSnapshot();
    });

    it('checkboxes with search', () => {
      search = { value: 'geller', placeholder: 'Search' };
      component = shallow(getComponent(value, items, disabled, inline, search, onValueChangeSpy, onStateChangeSpy));
      expect(component).toMatchSnapshot();
    });
  });

  describe('should trigger', () => {
    beforeEach(() => {
      search = { value: '', placeholder: 'Search' };
      component = mount(getComponent(value, items, disabled, inline, search, onValueChangeSpy, onStateChangeSpy));
    });

    it('onStateChange callback on search value change', () => {
      const newValue = 'banana';
      component
        .find('input[type="search"]')
        .simulate('change', { target: { value: newValue } });

      const expectedSearch = Object.assign({}, search);
      expectedSearch.value = newValue;
      expect(onStateChangeSpy).toHaveBeenCalledWith({
        items,
        inline,
        search: expectedSearch,
      });
    });

    it('onValueChange callback on checkbox checked', () => {
      component.find('[value="3"] input[type="checkbox"]').simulate('change', {
        target: { value: '3', checked: true },
      });
      expect(onValueChangeSpy).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('onValueChange callback on checkbox unchecked', () => {
      component.find('[value="3"] input[type="checkbox"]').simulate('change', {
        target: { value: '2', checked: false },
      });
      expect(onValueChangeSpy).toHaveBeenCalledWith(['1']);
    });
  });

  function getComponent(value, items, disabled, inline, search, onValueChange, onStateChange) {
    return (
      <CheckboxCollection value={value} state={{ items, search, inline }} disabled={disabled}
        onValueChange={onValueChange} onStateChange={onStateChange} />);
  }
});
