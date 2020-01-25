/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInternal from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/Checkbox/Checkbox.jsx">Checkbox</a>
 from '@jafar-org/react-components/edit/Checkbox'
 */
export default class Checkbox extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
    state: PropTypes.shape({
      label: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
    state: {
      label: '',
    },
    disabled: false,
  };

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
