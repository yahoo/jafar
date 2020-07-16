/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Grid from '../../../components/Grid';
import db from '../../database';
import { downloadJson, downloadFormFiles } from '../../../utils/download';
import { Link, FormListWrapper } from './Styled';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

const FormList = ({ history }) => {
  const forms = db.searchEntity('form');
  const data = Object.values(forms);

  const create = () => history.push({ pathname: `/form/new` });

  const edit = (form) => history.push({ pathname: `/form/${form.model.id}` });

  const download = (form) => downloadJson(form, form.model.id);

  const remove = (form) => {
    db.removeEntity('form', form.model.id);
    window.location.reload();
  };

  const resetDB = () => {
    db.reset();
    window.location.reload();
  };

  return (
    <FormListWrapper id="form-list">
      <h1>Forms</h1>
      <p>
        We created a simple UI Form Editor - which you can use to create the form <Link
          href="https://yahoo.github.io/jafar/docs/arguments.html#model">model configuration</Link> and <Link
          href="https://yahoo.github.io/jafar/docs/react-layout.html">layout configuration</Link>, to help you get started. 
        These form configurations demos are saved on local storage.
        You can create form models, and download them (you might need to supply <Link
          href="https://yahoo.github.io/jafar/docs/arguments.html#resources">resources</Link> such as actual components
        if defined prior to use it in the Form class / component). In addition you can clone Jafar repository and
        change / adapt the Form Editor to your system's needs (located in the "react-editor" package).
      </p>
      <div>
        <Grid        
          data={data}
          columns={columns({ edit })}
          headerActions={headerActions({ resetDB, create })}
          rowActions={rowActions({ edit, download, downloadFormFiles, remove })} />
      </div>
    </FormListWrapper>
  );
};

export default FormList;
