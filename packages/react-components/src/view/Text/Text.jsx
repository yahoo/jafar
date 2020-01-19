/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { propTypes, defaultProps } from '../props';

export default class Text extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.string,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: '',
  })

  render() {
    return (<div>{this.props.value}</div>);
  }
}
