/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import Styled from './StyledComponents';

/**
 * Represent a string value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/view/Url/Url.jsx">
 Url</a> from '@jafar-org/react-components/view/Url'
 */
class Url extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    state: PropTypes.shape({
      label: PropTypes.string,
      target: PropTypes.string,
      maxLines: PropTypes.number,
    }),
  };

  static defaultProps = {
    value: '',
    state: {
      label: '',
      target: '_blank',
      maxLines: undefined,
    },
  };

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
