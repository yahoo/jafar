/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Button from '@material-ui/core/Button';
import createForm from '../../../../components/create-form';
import FormContext from '../../../../components/context';
import Field from '../../../../components/Field';
import Styled from '../../../components/StyledComponents';
import form from './form';
import users from './users';

const userStyle = { width: '150px', display: 'inline-block' };

class App extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {
      users,
    };
  }

  render() {
    return (
      <Styled.Root>
        <Styled.MainElement>
          {
            this.state.users.map((user, index) => (<p key={user.firstName} aria-label="User">
              <span style={userStyle}>{index + 1}. {user.firstName} {user.lastName} </span>
              <Button onClick={() => this.edit(user, index)} aria-label="Edit" color="primary">Edit</Button>
            </p>))
          }
        </Styled.MainElement>
        <Styled.MainElement>
          <Styled.SectionTitle>User</Styled.SectionTitle>
          <Field id="firstName" />
          <Field id="lastName" />
          <Field id="address" />
          <Button disabled={!this.context.model.dirty || this.context.model.invalid
            || this.context.model.processing} onClick={this.save}
          aria-label="Save" color="primary" variant="contained">Save</Button>
        </Styled.MainElement>
      </Styled.Root>);
  }

  edit = (user, index) => {
    // for more complicated forms that includes fields with states - replace the entire form definition instead changeData
    this.context.actions.changeData(user);
    this.editingIndex = index;
  }

  save = () => {
    const users = [...this.state.users];

    if (this.editingIndex !== undefined) {
      users[this.editingIndex] = this.context.model.data;
    } else {
      users.push(this.context.model.data);
    }

    this.setState({ users });
    delete this.editingIndex;
    this.context.actions.changeData({});
  }
}

export default createForm(form)(App);
