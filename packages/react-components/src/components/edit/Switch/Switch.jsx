/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import _Switch from '@material-ui/core/Switch';
import { toJafar } from '../../utils';

const propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  state: PropTypes.object,
  onValueChange: PropTypes.func.isRequired,
};

const defaultProps = {
  value: false,
  disabled: false,
  state: {},
};

export const mapper = ({ value, disabled, onValueChange, state }) => ({
  ...state,
  checked: value,
  disabled,
  onChange: event => onValueChange(event.target.checked),
});

const Switch = toJafar(_Switch, mapper);

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;


/** @component */
/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Switch">
 Switch</a> from '@jafar/react-components/edit/Switch'
 */
export const DemoSwitch = props => <Switch {...props} />; // hack for styleguidist 
DemoSwitch.propTypes = propTypes;
DemoSwitch.defaultProps = defaultProps;
DemoSwitch.displayName = 'Switch';
