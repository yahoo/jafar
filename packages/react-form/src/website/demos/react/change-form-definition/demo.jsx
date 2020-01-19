/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import Field from '../../../../components/Field';
import Form from '../../../../components/Form';
import Styled from '../../../components/StyledComponents';
import DataViewer from './custom-form-components/DataViewer';
import formEdit from './edit-form';
import formView from './view-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.formEdit = formEdit;
    this.formView = formView;

    this.state = {
      form: this.formEdit,
      edit: true,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form model={this.state.form.model} resources={this.state.form.resources}>
          <Styled.MainElement>
            <Field id="id" />
            <Field id="firstName" />
            <Field id="lastName" />
            <Button onClick={this.change}>Change Form</Button>
          </Styled.MainElement>
          <Styled.MainElement>
            <DataViewer />
          </Styled.MainElement>
        </Form>
      </React.Fragment>);
  }

  change = () => {
    this.setState({
      edit: !this.state.edit,
      form: this.state.edit ? this.formView : this.formEdit,
    });
  }
}
