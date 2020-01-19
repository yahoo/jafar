/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import { propTypes, defaultProps } from '../props';

export default class DateView extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.instanceOf(Date),
    state: PropTypes.shape({
      format: PropTypes.string,
    }),
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: undefined,
    state: {
      format: 'mm/dd/yyyy',
    },
  })

  render() {
    return (<div>{dateformat(this.props.value, this.props.state.format)}</div>);
  }
}
