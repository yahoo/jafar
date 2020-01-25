/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Represent value of any type
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Dropdown/Dropdown.jsx">
 Dropdown</a> from '@jafar-org/react-components/edit/Dropdown'
 */
export default class Dropdown extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    state: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })).isRequired,
      clearText: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    required: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    state: {
      items: [],
      clearText: 'None',
    },
    disabled: false,
    invalid: false,
    required: false,
  };

  getSelectedIndex() {
    const items = this.props.state.items || [];
    return items.findIndex(item => isEqual(this.props.value, item.value));
  }

  getSelected() {
    return this.props.state.items[this.getSelectedIndex()];
  }

  render() {
    if (!(this.props.state.items || []).length) {
      return null;
    }
    const item = this.getSelected();
    const value = item ? JSON.stringify(item.value) : '';

    return (
      <Select
        value={value}
        disabled={this.props.disabled}
        error={this.props.invalid}
        onChange={this.onValueChange}>
        {
          !this.props.required
          && <MenuItem value="">
            <em>{this.props.clearText || Dropdown.defaultProps.state.clearText}</em>
          </MenuItem>
        }
        {this.props.state.items.map((item) => {
          const value = JSON.stringify(item.value);
          return (<MenuItem key={item.label} value={value}>{item.label}</MenuItem>);
        })}
      </Select>
    );
  }

  onValueChange = (e) => {
    let value = e.target.value !== '' ? JSON.parse(e.target.value) : e.target.value;
    value = value === '' ? undefined : value;
    this.props.onValueChange(value);
  }
}
