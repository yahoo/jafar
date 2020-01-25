/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

/**
 * Represent a Date() value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/view/Date/Date.jsx">
 Date</a> from '@jafar-org/react-components/view/Date'
 */
export default class DateView extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    state: PropTypes.shape({
      format: PropTypes.string,
    }),
  };

  static defaultProps = {
    value: undefined,
    state: {
      format: 'mm/dd/yyyy',
    },
  };

  render() {
    return (<div>{dateformat(this.props.value, this.props.state.format)}</div>);
  }
}
