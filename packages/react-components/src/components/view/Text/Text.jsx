/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Represent a string value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/view/Text/Text.jsx">
 Text</a> from '@jafar/react-components/view/Text'
 */
export default class Text extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
  };

  render() {
    return (<div>{this.props.value}</div>);
  }
}
