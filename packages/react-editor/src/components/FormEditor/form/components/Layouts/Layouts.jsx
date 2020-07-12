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
import { LayoutEditor } from '../../../../index';
import Grid from '../../../../Grid';
import * as Styled from './Styled';


const downloadJson = (exportObj, exportName) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${exportName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

// value = [{ item }]
const Layouts = ({ value = [], onValueChange }) => {
  const parentForm = useContext(FormContext);
  const [editing, setEditing] = useState();

  const formId = (parentForm.model.data.model || {}).id;

  const add = () => {
    setEditing({ layout: {}, index: undefined });
  };

  const edit = ({ layout, index }) => {
    setEditing({ layout, index });
  };

  const duplicate = ({ layout }) => {
    setEditing({ layout: cloneDeep(layout), index: undefined });
  };

  const downloadAsJson = ({ layout }) => {
    downloadJson(layout, `${formId}-layout`);
  };

  const remove = ({ index }) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onValueChange(newValue);
  };

  const save = ({ data }) => {
    const newValue = [...value];
    const index = editing.index !== undefined ? editing.index : value.length;
    newValue[index] = data;
    onValueChange(newValue);
    setEditing();
  };
  
  const rowActions = [{
    label: 'Edit',
    icon: EditIcon,
    onClick: edit,
  }, {
    label: 'Duplicate',
    icon: DuplicateIcon,
    onClick: duplicate,
  }, {
    label: 'Download Json',
    icon: DownloadIcon,
    onClick: downloadAsJson,
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
    label: 'Name',
    content: ({ layout }) => layout.name,
  }, {
    label: 'Title',
    content: ({ layout }) => layout.item.title,
  }, {
    label: 'Layout',
    content: ({ layout }) => layout.item.layout,
  }, {
    label: 'Size',
    content: ({ layout }) => layout.item.size,
  }, {
    label: 'Sections',
    content: ({ layout }) => (layout.item.sections || []).length,
  }, {
    label: 'Main Actions',
    content: ({ layout }) => (layout.item.mainActions || []).map(x => x.label).join(', '),
  }, {
    label: 'Options Actions',
    content: ({ layout }) => (layout.item.optionsActions || []).map(x => x.label).join(', '),
  }];

  const data = value.map((layout, index) => ({ layout, index }));
  
  return (<div>
    {
      editing && <Styled.Wrapper aria-label="layout-editor"><LayoutEditor 
        formId={formId} 
        layout={editing.layout} 
        onCancel={setEditing} 
        onSave={save} 
      /></Styled.Wrapper>
    }
    <Grid
      columns={columns}
      data={data}
      headerActions={headerActions}
      rowActions={rowActions}
    />
  </div>);
};

export default Layouts;
