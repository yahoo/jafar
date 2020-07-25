/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import CheckboxCollection from '../../components/edit/CheckboxCollection';
import { mapper } from '../../components/edit/CheckboxCollection/CheckboxCollection';
  
describe('CheckboxCollection', () => {
  let componentProps;
  
  const jafarProps = {
    value: ['ocean'],
    disabled: true,
    state: {
      search: { value: 'oc' },
      inline: true,
      items:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    onValueChange: jest.fn(),
    onStateChange: jest.fn(),
  };

  const expectedProps = {
    value: jafarProps.value,
    disabled: jafarProps.disabled,
    items: jafarProps.state.items,
    search: jafarProps.state.search,
    inline: jafarProps.state.inline,
    onChange: expect.any(Function),
    onSearchChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(jafarProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = [expectedProps.items[1].value];
      componentProps.onChange(selected);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith(selected);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onSearchChange - call onStateChange with correct value', () => {
      componentProps.onSearchChange('ra');
      expect(jafarProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = jafarProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], search: { value: 'ra' } });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<CheckboxCollection {...jafarProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
 
