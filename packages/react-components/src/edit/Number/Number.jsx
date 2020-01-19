/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { propTypes, defaultProps } from '../props';

export default class Number extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.number,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: undefined,
    state: {
      placeholder: '',
      min: undefined,
      max: undefined,
      step: undefined,
      endAdornment: undefined,
      startAdornment: undefined,
    },
  })

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
