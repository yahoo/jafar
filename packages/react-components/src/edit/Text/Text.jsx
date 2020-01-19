/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { propTypes, defaultProps } from '../props';

export default class Text extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.string,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: '',
    state: {
      placeholder: '',
      multiline: false,
    },
  })

  render() {
    return (
      <FormControl>
        <Input
          type="text"
          value={this.props.value}
          placeholder={this.props.state.placeholder}
          disabled={this.props.disabled}
          multiline={this.props.state.multiline}
          rowsMax={this.props.state.rowsMax}
          error={this.props.invalid}
          onChange={this.onValueChange}
          inputProps={{
            maxLength: this.props.state.maxLength,
          }} />
        { this.props.state.maxLength === undefined ? null :
          <FormHelperText>{this.props.value.length} / {this.props.state.maxLength}</FormHelperText> }
      </FormControl>
    );
  }

  onValueChange = (e) => {
    this.props.onValueChange(e.target.value);
  }
}
