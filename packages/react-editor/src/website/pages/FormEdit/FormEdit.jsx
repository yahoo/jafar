/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import service from '../../service';
import { FormEditor } from '../../../components';
import components from './components';

const FormEdit = ({ match, history }) => {
  const [form, setForm] = useState();
  const [formIds, setFormIds] = useState();

  useEffect(() => {
    const loadData = async () => {
      const form = await service.getEntity('form', match.params.formId) || {};
      setForm(form);
      const forms = await service.searchEntity('form') || {};
      setFormIds(forms.data.map(x => x.model.id));
    };
    loadData();
  }, [match.params.formId]);

  const onCancel = () => history.push({ pathname: `/form` });

  const onSave = async ({ data }) => {
    await service.setEntity('form', data.model.id, data);
    onCancel();
  };

  return form && formIds ? (<FormEditor 
    form={form}
    formIds={formIds}
    components={components}
    onSave={onSave} 
    onCancel={onCancel} />) : (null);
};

export default FormEdit;
