/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import _Select from 'react-select';
import { customStyles } from '../Select/Select';
import { toJafar } from '../../utils';
 
const propTypes = {
  value: PropTypes.arrayOf(PropTypes.any),
  state: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })),
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    searchQuery: PropTypes.string,
    styles: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func,
};

const defaultProps = {
  value: [],
  state: {
    items: [],
    placeholder: 'Search',
    searchable: false,
    searchQuery: '',
    styles: {},
  },
  disabled: false,
  onStateChange: noop,
};
 
export const mapper = ({ value, state, disabled, onValueChange, onStateChange }) => {
  const onChange = selected => {
    const newValue = !selected ? undefined : selected.map(item => item.orgValue);
    onValueChange(newValue);
  };

  const onInputChange = searchQuery => onStateChange(({ state }) => ({ ...state, searchQuery }));

  // for value that is array of object we use itemIdField, cuz internal select should get value as string - 
  // it has problem getting objects as value since it cant compare between them
  const items = (state.items || []).map((item) => {
    return {
      label: item.label, 
      value: state.itemIdField ? item.value[state.itemIdField] : item.value, 
      orgValue: item.value, 
    };
  });

  let selected = (value || []).map(selectedItemValue => 
    items.find(item => isEqual(selectedItemValue, item.orgValue)));

  let options = items.filter(item => 
    !selected.find(selectedItem => isEqual(selectedItem.value, item.orgValue)));

  const styles = customStyles(state.styles);

  return {
    isMulti: true,
    value: selected, 
    options: options,
    placeholder: state.placeholder,
    isDisabled: disabled,
    isSearchable: !!state.searchable,
    inputValue: state.searchQuery,
    styles: styles,
    onChange,
    onInputChange,
  };
};
 
const MultiSelect = toJafar(_Select, mapper);
 
MultiSelect.propTypes = propTypes;
MultiSelect.defaultProps = defaultProps;
 
export default MultiSelect;
 
// hack for styleguidist (issue with hoc components)
/** @component */
/**
  * Represent a selection of multi items from async items list 
  * 
  * Import <a target="_blank" 
  href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/MultiSelect">
  MultiSelect</a> from '@jafar/react-components/edit/MultiSelect'
  */
export const DemoMultiSelect = props => <MultiSelect {...props} />;
DemoMultiSelect.propTypes = propTypes;
DemoMultiSelect.defaultProps = defaultProps;
DemoMultiSelect.displayName = 'MultiSelect';
 
