/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

/**
 * Represent a number
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Number/Number.jsx">
 Number</a> from '@jafar/react-components/edit/Number'
 */
export default class Number extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    state: PropTypes.shape({
      placeholder: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
      endAdornment: PropTypes.string,
      startAdornment: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    state: {
      placeholder: '',
      min: undefined,
      max: undefined,
      step: undefined,
      endAdornment: undefined,
      startAdornment: undefined,
    },
    disabled: false,
    invalid: false,
  };

  render() {
    const value = this.props.value === undefined ? '' : this.props.value; // Fixing Material controlled VS uncontrolled issue
    const { state } = this.props;
    const endAdornment = state.endAdornment ? <div style={{ marginLeft: '5px' }}>{state.endAdornment}</div> : undefined;
    const startAdornment = state.startAdornment ? <div style={{ marginRight: '5px' }}>{state.startAdornment}</div> : undefined;

    return (
      <Input
        type="number"
        value={value}
        placeholder={state.placeholder}
        disabled={this.props.disabled}
        error={this.props.invalid}
        onChange={this.onValueChange}
        inputProps={{
          min: state.min,
          max: state.max,
          step: state.step,
        }}
        endAdornment={endAdornment}
        startAdornment={startAdornment}
      />
    );
  }

  onValueChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) ? undefined : value; // eslint-disable-line
    this.props.onValueChange(value);
  }
}
