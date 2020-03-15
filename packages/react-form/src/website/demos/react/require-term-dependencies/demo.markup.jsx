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
import form from './form/index.js';

class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (
        <Field id="description" />
        <Field id="shortDescription" />
        <Button disabled={!this.context.model.dirty || this.context.model.invalid || this.context.model.processing}
                onClick={this.save}>Save</Button>
      </div>
      <div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }

  save = () => {
    this.context.actions.changeData({});
  }
}

export default createForm(form)(Demo);`;

export default () => (<DemoMarkup exampleName="require-term-dependencies" demo={demo} />);