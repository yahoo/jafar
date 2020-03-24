/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import JSZip from 'jszip';
import { withTheme } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import Boolean from '@jafar/react-components/view/Boolean';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import Grid from '../../components/Grid';
import db from '../database';

export const Link = withTheme(styled.a`
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
  &:hover {
    text-decoration: underline;
  }
`);

const FormListWrapper = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 700px;
`;

export const BooleanWrapper = styled.div`
  position: relative;
  top: 7px;
`;

const downloadFiles = (form) => {
  const rootFolder = new JSZip();
  let formIndex = `import fields from './fields';\n`;
  const formIndexModelImports = ['fields'];

  // add fields folder
  const fieldsFolder = rootFolder.folder('fields');
  let fieldsIndex = '';
  const fieldIds = Object.keys(form.model.fields);
  fieldIds.forEach(fieldId => {
    fieldsFolder.file(`${fieldId}.json`, JSON.stringify(form.model.fields[fieldId]));
    fieldsIndex += `import ${fieldId} from './${fieldId}.json';\n`;
  });
  fieldsIndex += `\n\nexport default { ${ fieldIds.join(', ') } }`;
  fieldsFolder.file('index.js', fieldsIndex);

  // add data file
  if (form.model.data) {
    rootFolder.file('data.json', JSON.stringify(form.model.data));
    formIndex += `import data from './data.json';\n`;
    formIndexModelImports.push('data');
  }

  // add settings file
  if (form.settings) {
    rootFolder.file('settings.json', JSON.stringify(form.settings));
    formIndex += `import settings from './settings.json';\n`;
  }

  formIndex += `\nexport default { model: { id: '${form.model.id}', ${formIndexModelImports.join(', ')} }${ form.settings ? 
    ', settings' : '' } }`;
  rootFolder.file('index.js', formIndex);

  rootFolder.generateAsync({ type:'blob' }).then((content) => {
    const href = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('download', `${form.model.id}.zip`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const downloadJson = (exportObj, exportName) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const FormList = ({ history }) => {
  const forms = db.searchEntity('form');

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

  const rowActions = [{
    label: 'Edit',
    icon: EditIcon,
    onClick: edit,
  }, {
    label: 'Download Json',
    icon: DownloadIcon,
    onClick: download,
  }, {
    label: 'Download Files',
    icon: DownloadIcon,
    onClick: downloadFiles,
  }, {
    label: 'Delete',
    icon: DeleteIcon,
    onClick: remove,
  }];

  const headerActions = [{
    label: 'Init Mock Forms',
    onClick: resetDB,
    variant: 'outlined',
  }, {
    label: 'Create',
    onClick: create,
  }];

  const columns = [{
    label: 'Id',
    content: (form) => <Link onClick={() => edit(form)}>{form.model.id}</Link>,
  }, {
    label: 'Fields',
    content: (form) => Object.keys(form.model.fields).length,
  }, {
    label: 'Initial Data',
    content: (form) => <BooleanWrapper><Boolean value={!!form.model.data} /></BooleanWrapper>,
  }, {
    label: 'Settings',
    content: (form) => <BooleanWrapper><Boolean value={!!form.settings} /></BooleanWrapper>,
  }];

  const data = Object.values(forms);

  return (
    <FormListWrapper id="form-list">
      <h1>Forms</h1>
      <p>
        We created a simple UI Form Editor - which you can use to create the form <Link
          href="https://yahoo.github.io/jafar/docs/arguments.html#model">model configuration</Link>, to help you get started. 
        These form configurations demos are saved on local storage.
        You can create form models, and download them (you might need to supply <Link
          href="https://yahoo.github.io/jafar/docs/arguments.html#resources">resources</Link> such as actual components
        if defined prior to use it in the Form class / component). In addition you can clone the repo and
        change / adapt the Form Editor to your system's needs (located in the "react-editor" package).
      </p>
      <div aria-label="Forms Grid">
        <Grid        
          columns={columns}
          data={data}
          headerActions={headerActions}
          rowActions={rowActions} />
      </div>
    </FormListWrapper>
  );
};

export default FormList;
