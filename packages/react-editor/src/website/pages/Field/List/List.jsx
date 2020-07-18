/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import service from '../../../service';
import List from '../../Base/List';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

const onDelete = async (field) => {
  debugger; // eslint-disable-line

  // unlink all referenced fields
  const forms = await service.searchEntity('form') || {};
  const referencedForms = forms.data.filter(form => (form.model.fields[field.id] || {})._referenced);
  referencedForms.forEach(form => {
    delete form.model.fields[field.id]._referenced;
    service.setEntity('form', form.id, form);
  });
};

export default () => (<List
  name="field" 
  label="Fields"
  columns={columns} 
  headerActions={headerActions()} 
  rowActions={rowActions()}
  onDelete={onDelete}
/>);
