/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import SelectInternal from 'react-select';
import PropTypes from 'prop-types';
import { customStyles } from '../Select/Select';

/**
 * Represent a selection of a single item from async items list
 * 
 * Import <a target="_blank" href=
 "https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/AsyncSelect/AsyncSelect.jsx">
 AsyncSelect</a>
 from '@jafar-org/react-components/edit/AsyncSelect'
 */
export default class AsyncSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    state: PropTypes.shape({
      items: PropTypes.array,
      placeholder: PropTypes.string,
      searchQuery: PropTypes.string,
      isLoading: PropTypes.bool,
    }),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func,
  };

  static defaultProps = {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined 
    state: {
      items: [],
      placeholder: 'Search',
      searchQuery: '',
      isLoading: false,
    },
    disabled: false,
    required: false,
  };

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
