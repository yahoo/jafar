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
  value: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
  })),
  state: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })),
    placeholder: PropTypes.string,
    searchQuery: PropTypes.string,
    isLoading: PropTypes.bool,
    itemIdField: PropTypes.string,
    styles: PropTypes.object,
  }),
};

const defaultProps = {
  value: [],
  state: {
    items: [],
    placeholder: 'Search...',
    searchQuery: '',
    isLoading: false,
    styles: {},
  },
  disabled: false,
};

export const mapper = ({ value, state, disabled, onValueChange, onStateChange }) => {
  const onChange = selected => {
    const newValue = !selected ? undefined : selected.map(item => ({ label: item.label, value: item.orgValue }));
    onValueChange(newValue);
  };

  const onInputChange = searchQuery => onStateChange(({ state }) => ({ ...state, searchQuery }));

  // for value that is array of object we use itemIdField, cuz internal select should get value as string - 
  // it has problem getting objects as value since it cant compare between them
  const mapFunc = (item) => ({
    label: item.label, 
    value: state.itemIdField ? item.value[state.itemIdField] : item.value, 
    orgValue: item.value, 
  });

  const selected = value.map(mapFunc);
  const options = (state.items || []).map(mapFunc);
  const styles = customStyles(state.styles);

  return {
    isMulti: true,
    value: selected,
    options,
    placeholder: state.placeholder,
    isDisabled: disabled,
    isSearchable:true,
    isLoading: !!state.isLoading,
    inputValue: state.searchQuery,
    styles,
    onChange,
    onInputChange,
  };
};

const AsyncMultiSelect = toJafar(_Select, mapper);

AsyncMultiSelect.propTypes = propTypes;
AsyncMultiSelect.defaultProps = defaultProps;

export default AsyncMultiSelect;

// hack for styleguidist (issue with hoc components)
/** @component */
/**
 * Represent a selection of multi items from async items list 
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/AsyncMultiSelect">
 AsyncMultiSelect</a> from '@jafar/react-components/edit/AsyncMultiSelect'
 */
export const DemoAsyncMultiSelect = props => <AsyncMultiSelect {...props} />;
DemoAsyncMultiSelect.propTypes = propTypes;
DemoAsyncMultiSelect.defaultProps = defaultProps;
DemoAsyncMultiSelect.displayName = 'AsyncMultiSelect';
