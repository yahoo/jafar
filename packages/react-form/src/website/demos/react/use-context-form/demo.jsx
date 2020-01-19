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
          <Field id="name" />
          <Field id="lastName" />
          <div id="errors-summary">
            <h4>Errors summary:</h4>
            {
              Object.keys(this.context.model.errors).map(fieldId => (<ul key={fieldId}>
                { this.context.model.errors[fieldId].map((error, index) => 
                  <li key={index}>Error in {this.context.model.fields[fieldId].label}: {error.message}</li>) }
              </ul>))
            }
          </div>
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </React.Fragment>);
  }
}

export default createForm(form)(App);
