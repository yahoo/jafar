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
import { downloadJson } from '../../../../../utils/download'; 
import * as Styled from './Styled';


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

  const save = ({ data }) => {
    const fieldId = data.id;
    const field = { ...data };
    delete field.id;
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
    label: 'Download Json',
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
  }, {
    label: 'Referenced',
    content: ({ field }) => <Styled.BooleanWrapper><Boolean value={!!field._referenced} /></Styled.BooleanWrapper>,
  }];

  const data = Object.keys(value).sort().map(fieldId => ({ fieldId, field: value[fieldId] }));

  const parentModel = parentForm.model.data.model || {};
  
  return (<>
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
    <Styled.GridWrapper>
      <Grid
        columns={columns}
        data={data}
        headerActions={headerActions}
        rowActions={rowActions} />
    </Styled.GridWrapper> 
  </>);
};

export default Fields;
