/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import InternalSwitch from '@material-ui/core/Switch';

/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Switch/Switch.jsx">
 Switch</a> from '@jafar-org/react-components/edit/Switch'
 */
export default class Switch extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
    disabled: false,
  };

  render() {
    return (
      <InternalSwitch
        onChange={this.onValueChange}
        checked={this.props.value}
        disabled={this.props.disabled} />
    );
  }
 
 onValueChange = (e) => {
   this.props.onValueChange(e.target.checked);
 }
}
