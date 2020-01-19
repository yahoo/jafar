/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import Field from '../../../../components/Field';
import FormContext from '../../../../components/context';
import createForm from '../../../../components/create-form';
import Styled from '../../../components/StyledComponents';
import form from './form';


class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <React.Fragment>
        <Styled.MainElement>
          <Field id="hobbies" />
          <Button disabled={this.context.model.invalid} onClick={this.reset}
            aria-label="Reset" variant="contained" color="primary">Reset</Button>
        </Styled.MainElement>
        <Styled.MainElement>
          <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
        </Styled.MainElement>
      </React.Fragment>);
  }

  reset = () => {
    this.context.actions.reset();
  }
}

export default createForm(form)(Demo);
