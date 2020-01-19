/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import fieldWithContext from '../../../../components/field-with-context';
import FormContext from '../../../../components/context';
import createForm from '../../../../components/create-form';
import Styled from '../../../components/StyledComponents';
import FieldView from './CustomFieldView';
import form from './form';

const Field = fieldWithContext(FieldView);

class App extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <Styled.Root>
        <Styled.MainElement>
          <Styled.SectionTitle>First Section</Styled.SectionTitle>
          <Field id="id" />
          <Styled.SectionTitle>Second Section</Styled.SectionTitle>
          <Field id="name" />
          <Field id="hobbies" />
          <Button disabled={this.context.model.invalid} onClick={this.reset}
            aria-label="Reset" color="primary">Reset</Button>
          <Button disabled={!this.context.model.dirty || this.context.model.invalid
            || this.context.model.processing} onClick={this.save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </Styled.Root>);
  }

  reset = () => {
    this.context.actions.reset();
  }

  save = () => {
    console.log('Saving data to the server...', this.context.model.data); // eslint-disable-line
  }
}

export default createForm(form)(App);
