/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FormContext } from '@jafar/react-form';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import DuplicateIcon from '@material-ui/icons/FileCopy';
import Boolean from '@jafar/react-components/view/Boolean';
import { FieldEditor } from '../../../../index';
import Grid from '../../../../Grid';
import * as Styled from './Styled';

const downloadJson = (exportObj, exportName) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const Fields = ({ value = {}, onValueChange }) => {
  const parentForm = useContext(FormContext);
  const [editingField, setEditingField] = useState();

  const add = () => {
    setEditingField({ field: {} });
  };

  const duplicate = ({ fieldId }) => {
    const field = cloneDeep(value[fieldId]);
    delete field.id;
    setEditingField({ fieldId: field.id, field });
  };

  const download = ({ fieldId }) => {
    downloadJson(value[fieldId], fieldId);
  };

  const remove = ({ fieldId }) => {
    const newValue = { ...value };
    delete newValue[fieldId];
    onValueChange(newValue);
  };

  const save = ({ fieldId, field }) => {
    const newValue = { ...value };
    newValue[fieldId] = field;
    onValueChange(newValue);
    setEditingField();
  };
  
  const rowActions = [{
    label: 'Edit',
    icon: EditIcon,
    onClick: setEditingField,
  }, {
    label: 'Duplicate',
    icon: DuplicateIcon,
    onClick: duplicate,
  }, {
    label: 'Download',
    icon: DownloadIcon,
    onClick: download,
  }, {
    label: 'Remove',
    icon: DeleteIcon,
    onClick: remove,
  }];

  const headerActions = [{
    label: 'Add',
    onClick: add,
  }];

  const columns = [{
    label: 'Id',
    content: ({ fieldId, field }) => (<Styled.FieldLink onClick={() => setEditingField({ fieldId, field })}>
      {fieldId}</Styled.FieldLink>),
  }, {
    label: 'Label',
    content: ({ field }) => field.label,
  }, {
    label: 'Dependencies',
    content: ({ field }) => (field.dependencies || []).join(', '),
  }, {
    label: 'Required',
    content: ({ field }) => <Styled.BooleanWrapper><Boolean value={field.required} /></Styled.BooleanWrapper>,
  }, {
    label: 'Validations',
    content: ({ field }) => (field.validators || []).map(x => x.name).join(', '),
  }, {
    label: 'Component',
    content: ({ field }) => field.component ? field.component.name : '',
  }];

  const data = Object.keys(value).sort().map(fieldId => ({ fieldId, field: value[fieldId] }));

  const parentModel = parentForm.model.data.model || {};
  
  return (<div>
    {
      editingField && <Styled.FieldEditorWrapper aria-label="field-editor"><FieldEditor 
        formId={parentModel.id} 
        fieldId={editingField.fieldId} 
        field={editingField.field} 
        fieldIds={Object.keys(parentModel.fields || {})} 
        onCancel={setEditingField} 
        onSave={save} 
      /></Styled.FieldEditorWrapper>
    }
    <Grid
      columns={columns}
      data={data}
      headerActions={headerActions}
      rowActions={rowActions}
    />
  </div>);
};

export default Fields;
