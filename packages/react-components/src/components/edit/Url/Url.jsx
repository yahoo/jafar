/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';

/**
 * Represent a string value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Url/Url.jsx">
 Url</a> from '@jafar-org/react-components/edit/Url'
 */
export default class Url extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    state: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
    state: {
      placeholder: '',
    },
    disabled: false,
    invalid: false,
  };

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
