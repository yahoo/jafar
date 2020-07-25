/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import _Select from 'react-select';
import { toJafar } from '../../utils';
 
export const styleOverrides = {
  control: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    borderTopWidth: '0px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    borderRadius: '0px',
    boxShadow: '0 0 0 0',
    backgroundColor: 'transparent',
    minHeight: '32px',
  },
  singleValue: {
    font: 'inherit',
    padding: '6px 0 7px 0',
    width: '100%',
    margin: 0,
  },
  valueContainer: {
    font: 'inherit',
    padding: '0',
  },
  clearIndicator: {
    padding: '6px 5px 5px 5px',
  },
  dropdownIndicator: {
    padding: '6px 5px 5px 5px',
  },
  menu: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
};

const getStyle = (a, b) => (provided) => ({ ...provided, ...a, ...b });

export const customStyles = (styles = {}) => ({
  control: getStyle(styleOverrides.control, styles.control),
  singleValue: getStyle(styleOverrides.singleValue, styles.singleValue),
  valueContainer: getStyle(styleOverrides.valueContainer, styles.valueContainer),
  clearIndicator: getStyle(styleOverrides.clearIndicator, styles.clearIndicator),
  dropdownIndicator: getStyle(styleOverrides.dropdownIndicator, styles.dropdownIndicator),
  menu: getStyle(styleOverrides.menu, styles.menu),
  menuList: getStyle(styleOverrides.menuList, styles.menuList),
});

const propTypes = {
  value: PropTypes.any,
  state: PropTypes.shape({
    items: PropTypes.array,
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    searchQuery: PropTypes.string,
    styles: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func,
};

const defaultProps = {
  value: undefined,
  state: {
    items: [],
    placeholder: 'Search',
    searchable: false,
    searchQuery: '',
    styles: {},
  },
  disabled: false,
  required: false,
  onStateChange: noop,
};

export const mapper = ({ value, state, disabled, required, onValueChange, onStateChange }) => {
  const onChange = selected => {
    const newValue = selected ? selected.value : selected;
    onValueChange(newValue);
  };

  const onInputChange = searchQuery => onStateChange(({ state }) => ({ ...state, searchQuery }));

  // null - fixes underline controlled VS uncontrolled issue when value turns to undefined
  let selected = (state.items || []).find(x => isEqual(x.value, value)) || null;
  const styles = customStyles(state.styles);

  return {
    value: selected,
    options: state.items,
    placeholder: state.placeholder,
    isDisabled: disabled,
    isClearable: !required,
    isSearchable: !!state.searchable,
    inputValue: state.searchQuery,
    styles,
    onChange,
    onInputChange,
  };
};

const Select = toJafar(_Select, mapper);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;

// hack for styleguidist (issue with hoc components)
/** @component */
/**
 * Represent a selection of multi items from async items list 
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Select">
 Select</a> from '@jafar/react-components/edit/Select'
 */
export const DemoSelect = props => <Select {...props} />;
DemoSelect.propTypes = propTypes;
DemoSelect.defaultProps = defaultProps;
DemoSelect.displayName = 'Select';
