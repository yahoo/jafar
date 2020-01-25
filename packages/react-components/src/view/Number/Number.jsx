/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represent a number value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/view/Number/Number.jsx">
 Number</a> from '@jafar-org/react-components/view/Number'
 */
export default class Number extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    state: PropTypes.shape({
      fixed: PropTypes.number,
      template: PropTypes.string,
    }),
  };

  static defaultProps = {
    value: undefined,
    state: {
      fixed: undefined,
      template: undefined,
    },
  };

  render() {
    const state = this.props.state;
    let value = this.props.value;

    if (value !== undefined && value !== null) {
      if (state.fixed) {
        value = value.toFixed(state.fixed);
      }
      value = value.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
      if (state.template) {
        value = state.template.replace('$NUMBER', value);
      }
    }
    
    return (<div>{value}</div>);
  }
}
