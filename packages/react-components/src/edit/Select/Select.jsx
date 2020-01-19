/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import SelectInternal from 'react-select';
import { isEqual } from 'lodash';
import { defaultProps } from '../props';

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

export const customStyles = {
  control: (provided) => ({
    ...provided,
    ...styleOverrides.control,
  }),
  singleValue: (provided) => ({
    ...provided,
    ...styleOverrides.singleValue,
  }),
  valueContainer: (provided) => ({
    ...provided,
    ...styleOverrides.valueContainer,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    ...styleOverrides.clearIndicator,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    ...styleOverrides.dropdownIndicator,
  }),
  menu: (provided) => ({
    ...provided,
    ...styleOverrides.menu,
  }),
};

export default class Select extends React.Component {
  static defaultProps = Object.assign({}, defaultProps, {
    state: {
      items: [],
      placeholder: 'Search',
      searchable: false,
      searchQuery: '',
    },
  })

  render() {
    // null - fixes underline controlled VS uncontrolled issue when value turns to undefined
    let selected = (this.props.state.items || []).find(x => isEqual(x.value, this.props.value)) || null;

    return (
      <SelectInternal
        value={selected}
        onChange={this.onValueChange}
        options={this.props.state.items}
        placeholder={this.props.state.placeholder}
        isDisabled={this.props.disabled}
        isClearable={!this.props.required}
        isSearchable={!!this.props.state.searchable}
        inputValue={this.props.state.searchQuery}
        onInputChange={this.onSearchChange}
        styles={customStyles}
      />
    );
  }

  onValueChange = (selected) => {
    let newValue = selected ? selected.value : selected;
    this.props.onValueChange(newValue);
  }

  onSearchChange = (query) => {
    const newState = Object.assign({}, this.props.state);
    newState.searchQuery = query;
    this.props.onStateChange(newState);
  }
}
