/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactJson from 'react-json-view';
import createForm from '../../../../components/create-form';
import FormContext from '../../../../components/context';
import Field from '../../../../components/Field';
import Styled from '../../../components/StyledComponents';
import form from './form';

class App extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <React.Fragment>
        <Styled.MainElement>
          <Field id="first" />
          <Field id="second" />
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </React.Fragment>);
  }
}

export default createForm(form)(App);
