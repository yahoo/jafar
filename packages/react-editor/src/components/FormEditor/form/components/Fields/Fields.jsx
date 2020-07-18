/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FormContext } from '@jafar/react-form';
import { FieldEditor } from '../../../../index';
import Grid from '../../../../Grid';
import { downloadJson } from '../../../../../utils/download'; 
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';
import * as Styled from './Styled';


const Fields = ({ value = {}, state = {}, onValueChange, onStateChange }) => {
  const parentForm = useContext(FormContext);
  const { editingField } = state;
  const setEditingField = editingField => onStateChange({ ...state, editingField });

  const add = () => {
    setEditingField({ field: {} });
  };

  const addFromLibrary = () => {
    // todo
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

  const data = Object.keys(value).sort().map(fieldId => ({ fieldId, field: value[fieldId] }));
  const parentModel = parentForm.model.data.model || {};
  const fieldsLibrary = parentForm.model.context.fieldsLibrary;
  
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
        columns={columns({ setEditingField })}
        data={data}
        headerActions={headerActions({ add, addFromLibrary, fieldsLibrary })}
        rowActions={rowActions({ setEditingField, duplicate, download, remove })} />
    </Styled.GridWrapper> 
  </>);
};

export default Fields;
