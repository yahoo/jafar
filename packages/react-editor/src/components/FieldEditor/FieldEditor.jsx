/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState } from 'react';
import { Form } from '@jafar/react-form';
import BaseItem from '../BaseItem';
import { model as initialModel, resources } from './form';
import sections from './sections';

const FieldEditor = ({ onCancel, onSave, formId, fieldId, field = {}, fieldIds = [] }) => {
  const [model] = useState({ 
    ...initialModel, 
    data: { id: fieldId, ...field },
    context: { fieldIds: fieldIds.filter(id => id !== fieldId) },
  });

  const title = `Field | ${formId || 'new'} / ${fieldId || 'new'}`;

  const save = ({ data }) => {
    const fieldId = data.id;
    const field = { ...data };
    delete field.id;
    onSave({ fieldId, field });
  };

  return model ? (<Form model={model} resources={resources}>
    <BaseItem 
      title={title} 
      sections={sections} 
      onSave={save}
      onCancel={onCancel} />
  </Form>) : (null);
};

export default FieldEditor;
