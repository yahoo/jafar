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

  const goToFields = () => history.push('/field');

  const actions = [{
    id: 'init-db',
    label: 'Init Mock DB',
    icon: DbIcon,
    onClick: resetDB,
  }, {
    id: 'forms',
    label: 'Forms',
    icon: FormIcon,
    onClick: goToForms,
  }, {
    id: 'fields',
    label: 'Fields Library',
    icon: FieldsIcon,
    onClick: goToFields,
  }]; 

  return (<Wrapper aria-label="home-page">
    <h1>Editor</h1>
    <p>
      A simple UI form editor - which you can use to create the form's <Link
        href="https://yahoo.github.io/jafar/docs/arguments.html#model">model</Link> and <Link
        href="https://yahoo.github.io/jafar/docs/react-layout.html">layout</Link> configurations, to help you get started. 
      These form configurations are saved on your local storage.
    </p>
    <h3>Features</h3>
    <ul>
      <li>Create form configuration</li>
      <li>Download form configuration as jsons and as files (you might need to supply custom <Link
        href="https://yahoo.github.io/jafar/docs/arguments.html#resources">resources</Link> such as actual components,
        custom validators and more - if defined in the form model, prior to passing it to the Form class / component)</li>
      <li>Create common fields in 'Fields Library'</li>
      <li>Add common fields to a form using a reference (i.e when a library field is updated - all referenced fields are 
        updated as well), or clone (i.e a full copy of the library field which will not be affected when the library field 
        updates)</li>
      <li>Clone Jafar repository and adapt the Form Editor to your system's needs (located in the "react-editor" package)</li>
    </ul>
    <h3>Get Started</h3>
    <Actions aria-label="actions">
      {
        actions.map(action => (<Action key={action.id} aria-label={action.id} onClick={action.onClick}>
          { done === action.label ? <Boolean value={true} /> : <action.icon /> }
          <div>{action.label}</div>
        </Action>))
      }
    </Actions>
  </Wrapper>);
});
