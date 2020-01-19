/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInternal from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { propTypes, defaultProps } from '../props';

export default class Checkbox extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.bool,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: false,
    state: {
      label: '',
    },
  })

  render() {
    return (
      <FormControlLabel
        control={
          <CheckboxInternal
            checked={this.props.value}
            disabled={this.props.disabled}
            onChange={this.onChange}
          />
        }
        label={this.props.state.label}
      />
    );
  }

  onChange = (e, checked) => {
    this.props.onValueChange(checked);
  };
}
