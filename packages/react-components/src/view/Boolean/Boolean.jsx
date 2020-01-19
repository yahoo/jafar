/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import TrueIcon from '@material-ui/icons/CheckCircleOutline';
import FalseIcon from '@material-ui/icons/NotInterested';
import { propTypes, defaultProps } from '../props';
import Styled from './StyledComponents';

export default class Boolean extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.bool,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: false,
  })

  render() {
    const Icon = this.props.value ? TrueIcon : FalseIcon;
    const color = this.props.value ? '#1adc91' : '#989697';

    return (<Styled.Icon color={color}><Icon /></Styled.Icon>);
  }
}
