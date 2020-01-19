/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { propTypes, defaultProps } from '../props';
import Styled from './StyledComponents';

class Url extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.string,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: '',
    state: {
      label: '',
      target: '_blank',
      maxLines: undefined,
    },
  })

  render() {
    const { theme } = this.props;
    return (<Styled.A maxLines={this.props.state.maxLines}
      color={theme.palette.secondary.main}
      href={this.props.value}
      target={this.props.state.target}>
      {this.props.state.label || this.props.value}</Styled.A>);
  }
}
export default withTheme(Url);
