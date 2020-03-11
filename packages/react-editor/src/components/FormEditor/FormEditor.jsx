/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState } from 'react';
import { Form } from '@jafar/react-form';
import styled from 'styled-components';
import BaseItem from '../BaseItem';
import { model as initialModel, resources } from './form';
import sections from './sections';

const FormEditorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const FormEditor = ({ form = {}, formIds = [], onCancel, onSave }) => {
  const formId = (form.model || {}).id;
  const title = `Form - ${formId || 'new'}`;

  const [model] = useState({ 
    ...initialModel, 
    data: form, 
    context: { formIds: formIds.filter(id => id !== formId) }, 
  });

  return (<FormEditorWrapper>
    <Form model={model} resources={resources}>
      <BaseItem 
        title={title} 
        sections={sections}
        onSave={onSave}
        onCancel={onCancel} />
    </Form>
  </FormEditorWrapper>);  
};

export default FormEditor;
