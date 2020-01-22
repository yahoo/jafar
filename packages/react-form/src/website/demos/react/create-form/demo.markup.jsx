/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import DemoMarkup from '../../../components/DemoMarkup';

const demo = `import React from 'react';
import { createForm, FormContext, createForm } from '@jafar-org/react-form';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import form from './form';

class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <div>
        <h2>First Section</h2>
        <Field id="id" />
        <h2>Second Section</h2>
        <Field id="name" />
        <Field id="hobbies" />
        <Button onClick={this.reset}>Reset</Button>
        <Button disabled={!this.context.model.dirty || this.context.model.invalid || this.context.model.processing}
                onClick={this.save}>Save</Button>
      </div>
      <div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }

  reset = () => {
    this.context.actions.reset();
  }

  save = () => {
    console.log('Saving data to the server...', this.context.model.data); // eslint-disable-line
  }
}

export default createForm(form)(Demo);`;

export default () => <DemoMarkup exampleName="create-form" data={true} demo={demo} />;
