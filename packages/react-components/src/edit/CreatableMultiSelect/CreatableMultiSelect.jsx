/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import SelectInternal from 'react-select/creatable';
import { propTypes, defaultProps } from '../props';
import { customStyles } from '../Select/Select';

export default class CreatableMultiSelect extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.array,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    state: {},
  })

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
