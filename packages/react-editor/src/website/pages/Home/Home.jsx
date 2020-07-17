import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import FormIcon from '@material-ui/icons/ListAlt';
import DbIcon from '@material-ui/icons/SettingsBackupRestore';
import FieldsIcon from '@material-ui/icons/List';
import Boolean from '@jafar/react-components/view/Boolean';
import service from '../../service';
import { Wrapper, Link, Actions, Action } from './Styled';

export default withRouter(({ history }) => {
  const [done, setDone] = useState();

  const resetDB = async () => {
    await service.reset();
    setDone(actions[0].label);
  };

  const goToForms = () => history.push('/form');

  const goToFields = () => history.push('/fields');

  const actions = [{
    label: 'Init Mock DB',
    icon: DbIcon,
    onClick: resetDB,
  }, {
    label: 'Forms',
    icon: FormIcon,
    onClick: goToForms,
  }, {
    label: 'Fields Library',
    icon: FieldsIcon,
    onClick: goToFields,
  }]; 

  return (<Wrapper>
    <h1>Editor</h1>
    <p>
      We created a simple UI form editor - which you can use to create the form <Link
        href="https://yahoo.github.io/jafar/docs/arguments.html#model">model configuration</Link> and <Link
        href="https://yahoo.github.io/jafar/docs/react-layout.html">layout configuration</Link>, to help you get started. 
      These form configurations demos are saved on local storage.
      You can create form models, and download them (you might need to supply <Link
        href="https://yahoo.github.io/jafar/docs/arguments.html#resources">resources</Link> such as actual components
      if defined prior to use it in the Form class / component). In addition you can clone Jafar repository and
      change / adapt the Form Editor to your system's needs (located in the "react-editor" package).
    </p>
    <Actions>
      {
        actions.map(action => (<Action key={action.label} onClick={action.onClick}>
          { done === action.label ? <Boolean value={true} /> : <action.icon /> }
          <div>{action.label}</div>
        </Action>))
      }
    </Actions>
  </Wrapper>);
});
