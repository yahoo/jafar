/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInternal from 'react-select/creatable';
import { customStyles } from '../Select/Select';

/**
 * Represent creation of dynamic string array
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/CreatableMultiSelect/CreatableMultiSelect.jsx">
 CreatableMultiSelect</a> from '@jafar-org/react-components/edit/CreatableMultiSelect'
 */
export default class CreatableMultiSelect extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    state: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: [],
    state: {
      placeholder: '',
    },
    disabled: false,
  };

  render() {
    const value = (this.props.value || []).map(item => { return { label: item, value: item }; });

    return (
      <SelectInternal
        isMulti={true}
        value={value} 
        onChange={this.onValueChange}
        placeholder={this.props.state.placeholder}
        isDisabled={this.props.disabled}
        styles={customStyles}
      />
    );
  }

  onValueChange = (selected) => {
    const newValue = !selected ? undefined : selected.map(item => item.value);
    this.props.onValueChange(newValue);
  }
}
