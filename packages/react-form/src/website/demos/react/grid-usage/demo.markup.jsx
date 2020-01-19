/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import DemoMarkup from '../../../components/DemoMarkup';

const demo = `import React from 'react';
import { Form, Field } from '@jafar/react-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveButton from './custom-form-components/SaveButton';
import formEdit from './edit-form';
import formView from './view-form';
import usersList from './users';

const getForm = (data, orgForm) => {
  const form = cloneDeep(orgForm);
  Object.assign(form.model, { data, id: data.id });
  return form;
};

export default class Demo extends React.Component {
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
      <Grid container={true}>
        <Grid container={true} item={true} xs={12} style={headerStyle}>
          <Grid item={true} xs={1}>Id</Grid>
          <Grid item={true} xs={2}>First Name</Grid>
          <Grid item={true} xs={2}>Last Name</Grid>
          <Grid item={true} xs={4}>Facebook</Grid>
          <Grid item={true} xs={3}>Edit</Grid>
        </Grid>
        {rows}
      </Grid>);
  }
};`;

export default () => (<div>
  <DemoMarkup exampleName="grid-usage" formFolder="edit-form" hideHtml={true} />
  <DemoMarkup exampleName="grid-usage" formFolder="view-form" demo={demo} extraComponents={[
    'custom-form-components/SaveButton',
  ]} />
</div>);
