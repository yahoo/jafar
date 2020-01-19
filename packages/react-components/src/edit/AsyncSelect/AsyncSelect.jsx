/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import SelectInternal from 'react-select';
import { customStyles } from '../Select/Select';
import { defaultProps } from '../props';

export default class AsyncSelect extends React.Component {
  static defaultProps = Object.assign({}, defaultProps, {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined 
    state: {
      items: [],
      placeholder: 'Search',
      searchQuery: '',
      isLoading: false,
    },
  })

  render() {
    return (
      <SelectInternal
        value={this.props.value}
        onChange={this.props.onValueChange}
        options={this.props.state.items}
        placeholder={this.props.state.placeholder}
        isDisabled={this.props.disabled}
        isClearable={!this.props.required}
        isLoading={!!this.props.state.isLoading}
        isSearchable={true}
        inputValue={this.props.state.searchQuery}
        onInputChange={this.onSearchChange}
        styles={customStyles}
      />
    );
  }

  onSearchChange = (query) => {
    const newState = Object.assign({}, this.props.state);
    newState.searchQuery = query;
    this.props.onStateChange(newState);
  }
}
