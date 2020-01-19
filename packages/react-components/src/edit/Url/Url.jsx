/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { propTypes, defaultProps } from '../props';

export default class Url extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.string,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: '',
    state: {
      placeholder: '',
    },
  });

  render() {
    return (
      <Input
        type="url"
        value={this.props.value}
        placeholder={this.props.state.placeholder}
        disabled={this.props.disabled}
        error={this.props.invalid}
        onChange={this.onValueChange} />
    );
  }

  onValueChange = (e) => {
    this.props.onValueChange(e.target.value);
  }
}
