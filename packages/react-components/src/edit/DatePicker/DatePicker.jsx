/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker as InternalDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { propTypes, defaultProps } from '../props';

export default class DatePicker extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.instanceOf(Date),
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined
    state: {
      format: 'MM/dd/yyyy',
      placeholder: '',
    },
  })

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InternalDatePicker
          autoOk={true}
          clearable={true}
          disableFuture={true}
          format={this.props.state.format || DatePicker.defaultProps.state.format}
          value={this.props.value}
          disabled={this.props.disabled}
          placeholder={this.props.state.placeholder}
          error={this.props.invalid}
          onChange={this.onChange}
        />
      </MuiPickersUtilsProvider>
    );
  }

  onChange = (value) => {
    this.props.onValueChange(value);
  };
}
