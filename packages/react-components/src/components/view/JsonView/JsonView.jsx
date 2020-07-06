/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import JsonInput from 'react-json-editor-ajrm';
import styled from 'styled-components';
 
const JsonViewWrapper = styled.div`
   [name="outer-box"], [name="container"] {
     width: 100% !important;
     height: 100% !important;
     overflow-y: auto;
   }
 `;

/**
 * Represent an object value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/view/JsonView/JsonView.jsx">
 JsonView</a> from '@jafar/react-components/view/JsonView'
 */
export default class JsonView extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    state: PropTypes.shape({
      height: PropTypes.string,
    }),
  };

  static defaultProps = {
    value: {},
    state: {
      height: '130px',
    },
  };

  render() {
    return (<JsonViewWrapper>
      <JsonInput
        locale="English"
        placeholder={this.props.value}
        viewOnly={true}
        height={this.props.state.height || JsonView.defaultProps.state.height} 
        theme="light_mitsuketa_tribute"
        confirmGood={false} />
    </JsonViewWrapper>);
  }
}
