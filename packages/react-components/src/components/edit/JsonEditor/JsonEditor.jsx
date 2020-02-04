/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import JsonInput from 'react-json-editor-ajrm';
import styled from 'styled-components';

const JsonEditorWrapper = styled.div`
  [name="outer-box"], [name="container"] {
    width: 100% !important;
  }
`;

/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" href=
 "https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/JsonEditor/JsonEditor.jsx">JsonEditor</a>
 from '@jafar-org/react-components/edit/JsonEditor'
 */
export default ({ value = {}, state = {}, onValueChange }) => {
  return (<JsonEditorWrapper>
    <JsonInput 
      placeholder={value} 
      height={state.height || '130px'} 
      theme="light_mitsuketa_tribute"
      confirmGood={false}
      onChange={(obj) => {
        if (obj.error) return;
        onValueChange(obj.jsObject) 
      }} />
  </JsonEditorWrapper>);
};

export default class JsonEditor extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    state: PropTypes.shape({
      label: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: {},
    state: {
      label: '',
    },
    disabled: false,
  };

  render() {
    return (<JsonEditorWrapper>
      <JsonInput 
        placeholder={value} 
        height={state.height || '130px'} 
        theme="light_mitsuketa_tribute"
        confirmGood={false}
        onChange={this.onChange} />
    </JsonEditorWrapper>);
  }

  onChange = (obj) => {
    if (obj.error) return;
    this.props.onValueChange(obj.jsObject);
  };
}
