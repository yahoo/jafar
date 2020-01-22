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
        <Field id="address" />
        <Field id="employees" />
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

const demoEmployee = `import React from 'react';
import PropTypes from 'prop-types';
import { clone, cloneDeep } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { createForm, FormContext, createForm } from '@jafar-org/react-form';
import styled from 'styled-components';
import employeeForm from './form';

// Define the employee form
class Employee extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <h3>New Employee</h3>
      <Field id="firstName" />
      <Field id="lastName" />
      <Button disabled={!this.context.model.dirty || this.context.model.invalid || this.context.model.processing}
                onClick={this.save}>Save</Button>
      <Button onClick={this.props.onCancel}>Cancel</Button>
    </div>);
  }

  save = () => {
    this.props.onSave(this.context.model.data);
  }
}

const EmployeeForm = createForm(form)(Employee);


// Define the button to add and modal open
export const RemoveButton = styled.span\`
cursor: pointer;
font-size: 11px;
color: #0095ff;
position: relative;
top: 0px;
margin-left: 5px;
\`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: \`$\{top}%\`,
    left: \`$\{left}%\`,
    transform: \`translate(-$\{top}%, -$\{left}%)\`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class EmployeeModal extends React.Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    state: PropTypes.object,
    onValueChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: [],
  }

  open = () => {
    const state = clone(this.props.state);
    state.isModalOpen = true;
    this.props.onStateChange(state);
  };

  add = (employee) => {
    const value = clone(this.props.value);
    value.push(employee);
    this.props.onValueChange(value);
    this.close();
  };

  remove = (index) => {
    const value = clone(this.props.value);
    value.splice(index, 1);
    this.props.onValueChange(value);
  };

  close = () => {
    const state = clone(this.props.state);
    state.isModalOpen = false;
    this.props.onStateChange(state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ul>
          {
            this.props.value.map((employee, index) => 
              (<li key={index}>{index + 1}. {employee.name} <RemoveButton onClick={() => 
                { this.remove(index); }}>X</RemoveButton></li>))
          }
        </ul>

        <Button onClick={this.open}>Add New</Button>

        <Modal
          open={this.props.state.isModalOpen === true}
          onClose={this.close}>
          <div style={getModalStyle()} className={classes.paper}>
            <EmployeeForm onSave={this.add} onCancel={this.close} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeModal);`;

export default function markup() {
  return (<div>
    <h2>Company Form</h2>
    <DemoMarkup exampleName="dynamic-forms" data={true}
      demo={demo} />
    <h2>Employees Component (Containing Employee form)</h2>
    <DemoMarkup exampleName="dynamic-forms"
      formFolder="form/local-components/Employees/form"
      demo={demoEmployee} />
  </div>);
}
