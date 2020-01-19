import React from 'react';
import PropTypes from 'prop-types';
import { clone, cloneDeep } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import createForm from '../../../../../../../components/create-form';
import FormContext from '../../../../../../../components/context';
import Field from '../../../../../../../components/Field';
import employeeForm from './form';


class Employee extends React.Component {
  static contextType = FormContext;

  render() {
    return (<div>
      <h3>New Employee</h3>
      <Field id="firstName" />
      <Field id="lastName" />
      <Button disabled={!this.context.model.dirty || this.context.model.invalid
        || this.context.model.processing} onClick={this.save}
      aria-label="Save" color="primary" variant="contained">Save</Button>
      <Button onClick={this.props.onCancel}>Cancel</Button>
    </div>);
  }

  save = () => {
    this.props.onSave(this.context.model.data);
  }
}

const getEmployeeForm = () => {
  const form = cloneDeep(employeeForm); // formDefinition is shared also for example code usage
  return createForm(form)(Employee);
};

const EmployeeForm = getEmployeeForm();

export const RemoveButton = styled.span`
cursor: pointer;
font-size: 11px;
color: #0095ff;
position: relative;
top: 0px;
margin-left: 5px;
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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
    this.props.onStateChange({ ...this.props.state, isModalOpen: true });
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
    this.props.onStateChange({ ...this.props.state, isModalOpen: false });
  };

  render() {
    const { classes } = this.props;

    // const EmployeeForm = getEmployeeForm();

    return (
      <div>
        <ul>
          {
            this.props.value.map((employee, index) => (<li key={index}>
              {index + 1}. {employee.firstName} <RemoveButton onClick={() => { this.remove(index); }}>X</RemoveButton>
            </li>))
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

export default withStyles(styles)(EmployeeModal);
