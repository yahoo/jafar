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
import form from './form/index';

class Form extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <div>
        <div>
          <Field id="mergeReason" />
          <Button disabled={!this.context.model.dirty || this.context.model.invalid
            || this.context.model.processing} onClick={this.save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
        </div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>);
  }

  save = () => {
    this.context.actions.changeData({});
  }
}

const MyForm = createForm(form)(Form);

class App extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.state = { 
      appData: {
        userType: 'NORMAL',
      },
    };
  }

  render() {
    return (
      <div>
        <div>
          <Button className="switch-user" color="secondary" variant="contained" onClick={this.switchUser}>Switch User</Button>
          <h4 className="logged-in-user">Current User: {this.state.appData.userType}</h4>
        </div>
        <MyForm context={this.state.appData} />
      </div>);
  }

  switchUser = () => {
    // update the form's context reference, to trigger "changeContext" inside the form
    // note - from inside the form (in a child component) you can use context.actions.changeState
    this.setState({ 
      appData: { 
        userType: this.state.appData.userType === 'ADMIN' ? 'NORMAL' : 'ADMIN',
      },
    });
  }
}

export default App;`;

export default () => (<DemoMarkup exampleName="require-term-context" demo={demo} />);
