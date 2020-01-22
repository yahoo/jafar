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

const userStyle = { width: '150px', display: 'inline-block' };

class Demo extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {
      users,
    };
  }

  render() {
    return (<div>
      <div>
        {
          this.state.users.map((user, index) => (<p key={user.firstName}>
            <span style={userStyle}>{index + 1}. {user.firstName} {user.lastName} </span>
            <Button onClick={() => this.edit(user, index)} aria-label="Edit" color="primary">Edit</Button>
          </p>))
        }
      </div>
      <div>
        <h3>User</h3>
        <Field id="firstName" />
        <Field id="lastName" />
        <Field id="address" />
        <Button disabled={!this.context.model.dirty || this.context.model.invalid || this.context.model.processing}
          onClick={this.save} aria-label="Save" color="primary" variant="contained">Save</Button>
      </div>
    </div>);
  }

  edit = (user, index) => {
    // for more complicated forms thar includes fields with states - replace the entire form config instead changeData
    this.context.actions.changeData(user);
    this.editingIndex = index;
  }

  save = () => {
    const users = [...this.state.users];

    if (this.editingIndex) {
      users[this.editingIndex] = this.context.model.data;
    } else {
      users.push(this.context.model.data);
    }

    this.setState({ users });
    delete this.editingIndex;
    this.context.actions.changeData({});
  }
}

export default createForm(form)(Demo);`;

export default () => (<DemoMarkup exampleName="dynamic-data" demo={demo} />);
