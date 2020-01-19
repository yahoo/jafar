/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { cloneDeep } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Field from '../../../../components/Field';
import Form from '../../../../components/Form';
import Styled from '../../../components/StyledComponents';
import SaveButton from './custom-form-components/SaveButton';
import detailsForm from './view-form';
import editForm from './edit-form';
import usersList from './users';

const formEdit = cloneDeep(editForm);
const formDetails = cloneDeep(detailsForm);
const users = cloneDeep(usersList); // users is shared also for example code usage

const getForm = (data, orgForm) => {
  const form = cloneDeep(orgForm);
  Object.assign(form.model, { data, id: `${form.model.id}-${data.id}` });
  return form;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const stateUsers = {};

    users.forEach((user) => {
      stateUsers[user.id] = { data: user, form: getForm(user, formDetails) };
    });

    this.state = {
      users: stateUsers,
      editing: [],
    };
  }

  edit(userId) {
    const users = Object.assign({}, this.state.users);
    users[userId].form = getForm(users[userId].data, formEdit);

    this.setState({
      editing: [...this.state.editing, userId],
      users,
    });
  }

  save(user) {
    const userId = user.id;
    const users = Object.assign({}, this.state.users);
    users[userId].data = user;
    users[userId].form = getForm(users[userId].data, formDetails);

    const editing = [...this.state.editing];
    const index = editing.indexOf(userId);
    editing.splice(index, 1);

    this.setState({
      editing,
      users,
    });
  }

  cancel(userId) {
    const users = Object.assign({}, this.state.users);
    users[userId].form = getForm(users[userId].data, formDetails);
    const editing = [...this.state.editing];
    const index = editing.indexOf(userId);
    editing.splice(index, 1);

    this.setState({
      editing,
      users,
    });
  }

  render() {
    const headerStyle = {
      fontWeight: 'bold',
      marginBottom: '20px',
      borderBottom: '1px solid black',
      paddingBottom: '20px',
    };

    // prepare row to render
    const rows = users.map((orgUser) => {
      const user = this.state.users[orgUser.id].data;
      const { model, resources } = this.state.users[user.id].form;
      const isUserEditing = this.state.editing.includes(user.id);

      return (<Grid container={true} item={true} xs={12} key={user.id}>
        <Form model={model} resources={resources}>
          <Grid item={true} xs={1}>
            <Field id="id" />
          </Grid>
          <Grid item={true} xs={2}>
            <Field id="firstName" />
          </Grid>
          <Grid item={true} xs={2}>
            <Field id="lastName" />
          </Grid>
          <Grid item={true} xs={4}>
            <Field id="facebook" />
          </Grid>
          <Grid item={true} xs={3}>
            {
              isUserEditing
              && <div>
                <SaveButton onClick={(context) => { this.save(context.model.data); }}>Save</SaveButton>
                <Button color="primary" onClick={() => { this.cancel(user.id); }}>Cancel</Button>
              </div>
            }
            {
              !isUserEditing
              && <Button
                color="primary"
                onClick={() => { this.edit(user.id); }}>Edit</Button>
            }
          </Grid>
        </Form>
      </Grid>);
    });

    return (
      <Styled.Root>
        <Grid container={true}>
          <Grid container={true} item={true} xs={12} style={headerStyle}>
            <Grid item={true} xs={1}>Id</Grid>
            <Grid item={true} xs={2}>First Name</Grid>
            <Grid item={true} xs={2}>Last Name</Grid>
            <Grid item={true} xs={4}>Facebook</Grid>
            <Grid item={true} xs={3}>Edit</Grid>
          </Grid>
          {rows}
        </Grid>
      </Styled.Root>);
  }
}
