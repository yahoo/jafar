/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

/**
 * Represent a string
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/Password/Password.jsx">
 Password</a> from '@jafar-org/react-components/edit/Password'
 */
export default class Password extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    disabled: false,
    invalid: false,
  };

  render() {
    return (
      <Input
        type="password"
        value={this.props.value}
        disabled={this.props.disabled}
        error={this.props.invalid}
        onChange={this.onValueChange} />
    );
  }

  onValueChange = (e) => {
    this.props.onValueChange(e.target.value);
  }
}
