/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import DemoMarkup from '../../../components/DemoMarkup';

const demo = `import React from 'react';
import { createForm, FormContext, createForm } from '@jafar/react-form';
import Button from '@material-ui/core/Button';
import ReactJson from 'react-json-view';
import formDefinition from './form/index.js';

class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <div>
        <Field id="name" />
        <Field id="hobbies" />
        <Button disabled={!this.context.form.dirty || this.context.form.invalid || this.context.form.processing}
                onClick={this.save}>Save</Button>
      </div>
      <div>
        <ReactJson src={this.context.form.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }

  save = () => {
    this.context.actions.reset();
  }
}

export default createForm(formDefinition)(Demo);`;

export default () => (<DemoMarkup exampleName="dependencies-changes-updates-value-and-state"
  dependenciesChanges={true} mockService={true} demo={demo} />);
