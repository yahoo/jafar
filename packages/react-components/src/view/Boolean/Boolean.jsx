/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import TrueIcon from '@material-ui/icons/CheckCircleOutline';
import FalseIcon from '@material-ui/icons/NotInterested';
import Styled from './StyledComponents';

/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/view/Boolean/Boolean.jsx">
 Boolean</a> from '@jafar-org/react-components/view/Boolean'
 */
export default class Boolean extends React.Component {
  static propTypes = {
    value: PropTypes.bool,
  };

  static defaultProps = {
    value: false,
  };

  render() {
    const Icon = this.props.value ? TrueIcon : FalseIcon;
    const color = this.props.value ? '#1adc91' : '#989697';

    return (<Styled.Icon color={color}><Icon /></Styled.Icon>);
  }
}
