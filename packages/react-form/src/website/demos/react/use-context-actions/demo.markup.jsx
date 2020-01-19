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
    return (<div>
      <div>
        <h2>First Section</h2>
        <Field id="id" />
        <h2>Second Section</h2>
        <Field id="name" />
        <Field id="hobbies" />
        <div>
          <div>Change value to 'Ross' for field 'name'</div>
          <Button color="primary" variant="contained" onClick={this.changeValue}>Change Field Value</Button>
          
          <div>Change state search value to 'ball' for field 'hobbies'</div>
          <Button color="primary" variant="contained" onClick={this.changeState}>Change Field State</Button>
          
          <div>Change ui - change component to 'label' for field 'name'</div>
          <Button color="primary" variant="contained" onClick={this.changeUi}>Change Field Component</Button>
          
          <div>Change form data</div>
          <Button color="primary" variant="contained" onClick={this.changeData}>Change Data</Button>
          
          <div>Change form context</div>
          <Button color="primary" variant="contained" onClick={this.changeContext}>Change Context</Button>
          
          <div>Submit form</div>
          <Button color="primary" variant="contained" onClick={this.submit}>Submit</Button>
          
          <div>Reset the form to its initial state</div>
          <Button color="primary" variant="contained" onClick={this.reset}>Reset</Button>
        </div>
      </div>
      <div>
        <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
      </div>
    </div>);
  }

  changeValue = async () => {
    this.timeAction('changeValue');
    this.duration[this.currentTiming] = [];
    await this.context.actions.changeValue('name', 'Ross');
    this.timeAction();
  }

  changeState = async () => {
    this.timeAction('changeState');
    const state = { ...this.context.model.fields.hobbies.component.state };
    state.search = { value: 'ball' };
    await this.context.actions.changeState('hobbies', state);
    this.timeAction();
  }

  changeUi = async () => {
    this.timeAction('changeUi');
    const component = { name: 'label' };
    await this.context.actions.changeUi('name', { component });
    this.timeAction();
  }

  changeData = async () => {
    this.timeAction('changeData');
    await this.context.actions.changeData({
      id: '7777777',
      name: 'Monica',
      hobbies: ['COOK'],
    });
    this.timeAction();
  }

  changeContext = async () => {
    this.timeAction('changeContext');
    await this.context.actions.changeContext({
      excludeId: !this.context.model.context.excludeId,
    });
    this.timeAction();
  }

  submit = async () => {
    this.timeAction('submit');
    const success = await this.context.actions.submit();
    if (success) {
      console.log('submit done!'); // eslint-disable-line
    }
    this.timeAction();
  }

  reset = async () => {
    this.timeAction('reset');
    await this.context.actions.reset();
    this.timeAction();
  }

  timeAction = (action) => {
    this.currentTiming = action;
    this.duration[action] = [];
  }

  getTiming = (action) => {
    const timings = this.duration[action];
    if (timings.length >= 2) {
      let time = timings[timings.length - 1] - timings[0];
      if (action === 'changeValue' || action === 'changeState') {
        time += ' (250ms is debounce)';
      }
      return time;
    }
    return 'none';
  }
}

export default createForm(form)(Demo);`;

export default function markup() {
  return (<DemoMarkup exampleName="use-context-actions" data={true} hooks={true} terms={true} mockService={true} demo={demo} />);
}
