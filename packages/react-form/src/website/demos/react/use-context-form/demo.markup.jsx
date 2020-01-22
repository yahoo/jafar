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
import form from './form/index.js';

class Demo extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <div>
        <Field id="name" />
        <Field id="lastName" />
        <div id="errors-summary">
          <h4>Errors summary:</h4>
          {
              Object.values(this.context.model.fields).map((field, i) => (<ul key={i}>
                { field.errors.map((error, index) => <li key={index}>Error in {field.label}: {error.message}</li>) }
              </ul>))
          }
        </div>
      </div>
      <div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }
}

export default createForm(form)(Demo);`;

export default function markup() {
  return (<DemoMarkup exampleName="use-context-form" demo={demo} />);
}
