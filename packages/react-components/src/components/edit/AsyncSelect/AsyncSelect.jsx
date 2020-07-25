/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import _Select from 'react-select';
import { customStyles } from '../Select/Select';
import { toJafar } from '../../utils';
 
const propTypes = {
  value: PropTypes.any,
  state: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })),
    placeholder: PropTypes.string,
    searchQuery: PropTypes.string,
    isLoading: PropTypes.bool,
    styles: PropTypes.object,
  }),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func,
};
 
const defaultProps = {
  value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined 
  state: {
    items: [],
    placeholder: 'Search',
    searchQuery: '',
    isLoading: false,
    styles: {},
  },
  disabled: false,
  required: false,
};
 
export const mapper = ({ value, state, disabled, required, onValueChange, onStateChange }) => {
  const onInputChange = searchQuery => onStateChange(({ state }) => ({ ...state, searchQuery }));
 
  const styles = customStyles(state.styles);

  return {
    value,
    options: state.items,
    placeholder: state.placeholder,
    isDisabled: disabled,
    isClearable: !required,
    isLoading: !!state.isLoading,
    isSearchable: true,
    inputValue: state.searchQuery,
    styles,
    onChange: onValueChange,
    onInputChange,
  };
};
 
const AsyncSelect = toJafar(_Select, mapper);
 
AsyncSelect.propTypes = propTypes;
AsyncSelect.defaultProps = defaultProps;
 
export default AsyncSelect;
 
// hack for styleguidist (issue with hoc components)
/** @component */
/**
  * Represent a selection of multi items from async items list 
  * 
  * Import <a target="_blank" 
  href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/AsyncSelect">
  AsyncSelect</a> from '@jafar/react-components/edit/AsyncSelect'
  */
export const DemoAsyncSelect = props => <AsyncSelect {...props} />;
DemoAsyncSelect.propTypes = propTypes;
DemoAsyncSelect.defaultProps = defaultProps;
DemoAsyncSelect.displayName = 'AsyncSelect';
