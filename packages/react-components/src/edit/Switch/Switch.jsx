/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import InternalSwitch from '@material-ui/core/Switch';
import { propTypes, defaultProps } from '../props';

export default class Switch extends React.Component {
 static propTypes = Object.assign({}, propTypes, {
   value: PropTypes.bool,
 })

 static defaultProps = Object.assign({}, defaultProps, {
   value: false,
 })

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
