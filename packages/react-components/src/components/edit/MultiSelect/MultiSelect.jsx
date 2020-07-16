/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInternal from 'react-select';
import { isEqual, noop } from 'lodash';
import { customStyles } from '../Select/Select';

/**
 * Represent a selection of multi items from fixed items list
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/MultiSelect/MultiSelect.jsx">
 MultiSelect</a> from '@jafar/react-components/edit/MultiSelect'
 */
export default class MultiSelect extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    state: PropTypes.shape({
      items: PropTypes.array,
      placeholder: PropTypes.string,
      searchable: PropTypes.bool,
      searchQuery: PropTypes.string,
      styles: PropTypes.object,
    }),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func,
  };

  static defaultProps = {
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

    const styles = customStyles(this.props.state.styles);

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
        styles={styles}
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
