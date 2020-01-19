/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInternal from 'react-select';
import { propTypes, defaultProps } from '../props';
import { customStyles } from '../Select/Select';

export default class AsyncMultiSelect extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.array,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    state: {
      items: [],
      placeholder: 'Search...',
      searchQuery: '',
      isLoading: false,
    },
  })

  render() {
    // for value that is array of object we use itemIdField, cuz internal select should get value as string - 
    // it has problem getting objects as value since it cant compare between them
    const mapFunc = (item) => {
      return {
        label: item.label, 
        value: this.props.state.itemIdField ? item.value[this.props.state.itemIdField] : item.value, 
        orgValue: item.value, 
      };
    };

    const selected = (this.props.value || []).map(mapFunc);
    const options = (this.props.state.items || []).map(mapFunc);

    return (
      <SelectInternal
        isMulti={true}
        value={selected} 
        onChange={this.onValueChange}
        options={options}
        placeholder={this.props.state.placeholder}
        isDisabled={this.props.disabled}
        isSearchable={true}
        isLoading={!!this.props.state.isLoading}
        inputValue={this.props.state.searchQuery}
        onInputChange={this.onSearchChange}
        styles={customStyles}
      />
    );
  }

  onValueChange = (selected) => {
    let newValue;
    newValue = !selected ? undefined : selected.map(item => { return { label: item.label, value: item.orgValue }; });
    this.props.onValueChange(newValue);
  }

  onSearchChange = (query) => {
    const newState = Object.assign({}, this.props.state);
    newState.searchQuery = query;
    this.props.onStateChange(newState);
  }
}
