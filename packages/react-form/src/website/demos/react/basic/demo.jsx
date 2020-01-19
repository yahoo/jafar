/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Form from '../../../../components/Form';
import Field from '../../../../components/Field';
import Styled from '../../../components/StyledComponents';
import DataViewer from './custom-form-components/DataViewer';
import SaveButton from './custom-form-components/SaveButton';
import ResetButton from './custom-form-components/ResetButton';
import form from './form';

export default () => (
  <Form model={form.model} resources={form.resources}>
    <Styled.MainElement>
      <Styled.SectionTitle>First Section</Styled.SectionTitle>
      <Field id="id" />
      <Styled.SectionTitle>Second Section</Styled.SectionTitle>
      <Field id="name" />
      <Field id="hobbies" />
      <ResetButton>Reset</ResetButton>
      <SaveButton>Save</SaveButton>
    </Styled.MainElement>
    <Styled.MainElement>
      <DataViewer />
    </Styled.MainElement>
  </Form>);
