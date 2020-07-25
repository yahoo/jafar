/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import MultiSelect from '../../components/edit/MultiSelect';
import { mapper } from '../../components/edit/MultiSelect/MultiSelect';
  
describe('MultiSelect', () => {
  let componentProps;
  
  const jafarProps = {
    value: ['ocean'],
    disabled: false,
    required: false,
    state: {
      searchable: true,
      searchQuery: 'oc',
      placeholder: 'Color...',
      items:[
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    onValueChange: jest.fn(),
    onStateChange: jest.fn(),
  };

  const mapFunc = (item) => ({ label: item.label, value: item.value, orgValue: item.value });
  
  const expectedProps = {
    isMulti: true,
    value: [{ value: 'ocean', label: 'Ocean' }].map(mapFunc),
    options: jafarProps.state.items.slice(1).map(mapFunc),
    placeholder: 'Color...',
    isDisabled: false,
    isSearchable: true,
    inputValue: 'oc',
    styles: expect.any(Object),
    onChange: expect.any(Function),
    onInputChange: expect.any(Function),
  };
   
  beforeEach(() => {
    componentProps = mapper(jafarProps);
  });
  
  describe('mapper', () => {
    it('return correct props', () => {
      expect(componentProps).toEqual(expectedProps);
    });
    
    it('onChange - call onValueChange with correct value', () => {
      const selected = expectedProps.options[0];
      componentProps.onChange([selected]);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith([jafarProps.state.items[1].value]);
    });
 
    it('onChange - call onValueChange with undefined value', () => {
      componentProps.onChange(undefined);
      expect(jafarProps.onValueChange).toHaveBeenCalledWith(undefined);
    });
 
    it('onInputChange - call onStateChange with correct value', () => {
      componentProps.onInputChange('ra');
      expect(jafarProps.onStateChange).toHaveBeenCalledWith(expect.any(Function));
      const updater = jafarProps.onStateChange.mock.calls[0][0];
      expect(updater({ state: { items: [] } })).toEqual({ items: [], searchQuery: 'ra' });
    });
  });
  
  describe('component', () => {
    it('renders ok', () => {
      const component = shallow(<MultiSelect {...jafarProps} />);
      expect(component.props()).toMatchObject(expectedProps);
    });
  });
});
