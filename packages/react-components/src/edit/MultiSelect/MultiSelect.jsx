/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInternal from 'react-select';
import { isEqual } from 'lodash';
import { propTypes, defaultProps } from '../props';
import { customStyles } from '../Select/Select';

export default class MultiSelect extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.array,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    state: {
      items: [],
      placeholder: 'Search',
      searchable: false,
      searchQuery: '',
    },
  })

  render() {
    // for value that is array of object we use itemIdField, cuz internal select should get value as string - 
    // it has problem getting objects as value since it cant compare between them
    const items = (this.props.state.items || []).map((item) => {
      return {
        label: item.label, 
        value: this.props.state.itemIdField ? item.value[this.props.state.itemIdField] : item.value, 
        orgValue: item.value, 
      };
    });

    let selected = (this.props.value || []).map(selectedItemValue => 
      items.find(item => isEqual(selectedItemValue, item.orgValue)));

    let options = items.filter(item => 
      !selected.find(selectedItem => isEqual(selectedItem.value, item.orgValue)));

    return (
      <SelectInternal
        isMulti={true}
        value={selected} 
        onChange={this.onValueChange}
        options={options}
        placeholder={this.props.state.placeholder}
        isDisabled={this.props.disabled}
        isSearchable={!!this.props.state.searchable}
        inputValue={this.props.state.searchQuery}
        onInputChange={this.onSearchChange}
        styles={customStyles}
      />
    );
  }

  onValueChange = (selected) => {
    const newValue = !selected ? undefined : selected.map(item => item.orgValue);
    this.props.onValueChange(newValue);
  }

  onSearchChange = (query) => {
    const newState = Object.assign({}, this.props.state);
    newState.searchQuery = query;
    this.props.onStateChange(newState);
  }
}
