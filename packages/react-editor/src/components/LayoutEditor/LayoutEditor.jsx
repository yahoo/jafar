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

const LayoutEditorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

// layout = { item }
const LayoutEditor = ({ parentModel, layout = {}, onCancel, onSave }) => {
  const title = `Layout for - ${parentModel.id}`;

  const [model] = useState({ ...initialModel, data: layout });

  return (<LayoutEditorWrapper aria-label="layout-editor">
    <Form model={model} resources={resources}>
      <BaseItem 
        title={title} 
        sections={sections}
        onSave={onSave}
        onCancel={onCancel} />
    </Form>
  </LayoutEditorWrapper>);  
};

export default LayoutEditor;
