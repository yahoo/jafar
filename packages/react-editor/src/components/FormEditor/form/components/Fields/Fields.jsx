/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FormContext } from '@jafar/react-form';
import { FieldEditor } from '../../../../index';
import Grid from '../../../../Grid';
import Dialog from '../../../../Dialog';
import { downloadJson } from '../../../../../utils/download'; 
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';
import { FieldEditorWrapper, GridWrapper } from './Styled';
import AddFromLibrary from './AddFromLibrary';


const Fields = ({ value = {}, state = {}, onValueChange, onStateChange }) => {
  const parentForm = useContext(FormContext);
  const { editingField, showModal, addFromLibraryValue } = state;
  const setEditingField = editingField => onStateChange({ ...state, editingField });
  const setShowModal = name => onStateChange({ ...state, showModal: name });
  const setAddFromLibraryValue = addFromLibraryValue => onStateChange({ ...state, addFromLibraryValue });

  const add = () => setEditingField({ field: {} });

  const save = ({ data }) => {
    const fieldId = data.id;
    const field = { ...data };
    delete field.id;
    const newValue = { ...value };
    newValue[fieldId] = field;
    onValueChange(newValue);
    setEditingField();
  };

  const addFromLibrary = () => setShowModal('library');

  const saveFromLibrary = () => {
    
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

  const data = Object.keys(value).sort().map(fieldId => ({ fieldId, field: value[fieldId] }));
  const parentModel = parentForm.model.data.model || {};
  const fieldsLibrary = parentForm.model.context.fieldsLibrary;

  return (<>
    {
      editingField && <FieldEditorWrapper aria-label="field-editor"><FieldEditor 
        formId={parentModel.id} 
        fieldId={editingField.fieldId} 
        field={editingField.field} 
        fieldIds={Object.keys(parentModel.fields || {})} 
        onCancel={setEditingField} 
        onSave={save} 
      /></FieldEditorWrapper>
    }
    {
      showModal === 'library' && <Dialog 
        open={true}
        title="Add Fields From Library"
        confirmText="Add"
        onConfirm={saveFromLibrary} 
        onCancel={setShowModal}>
        <AddFromLibrary 
          value={addFromLibraryValue} 
          onValueChange={setAddFromLibraryValue} 
          fields={fieldsLibrary.fields}
        />
      </Dialog>
    }
    <GridWrapper>
      <Grid
        columns={columns({ setEditingField })}
        data={data}
        headerActions={headerActions({ add, addFromLibrary, fieldsLibrary })}
        rowActions={rowActions({ setEditingField, duplicate, download, remove })} />
    </GridWrapper> 
  </>);
};

export default Fields;
