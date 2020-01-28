/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker as InternalDateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
 
/**
 * Represent a Date object
 * 
 * Import <a target="_blank" href=
 "https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/DateTimePicker/DateTimePicker.jsx">
 DateTimePicker</a> from '@jafar-org/react-components/edit/DateTimePicker'
 */
export default class DateTimePicker extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    state: PropTypes.shape({
      format: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null, // fixes underline controlled VS uncontrolled issue when value turns to undefined
    state: {
      format: 'MM/dd/yyyy hh:mm',
    },
    disabled: false,
    invalid: false,
  };
 
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InternalDateTimePicker
          autoOk={true}
          clearable={true}
          disableFuture={true}
          format={this.props.state.format || DateTimePicker.defaultProps.state.format}
          value={this.props.value}
          disabled={this.props.disabled}
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
 
