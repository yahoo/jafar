/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import service from '../../service';
import { FormEditor } from '../../../components';
import components from './components';

const FormEdit = ({ match, location, history }) => {
  const [form, setForm] = useState();
  const [formIds, setFormIds] = useState();

  useEffect(() => {
    const loadData = async () => {
      const params = new URLSearchParams(location.search); 
      const from = params.get('from');
      const isNew = match.params.id === 'new';
      const formId = isNew ? from : match.params.id;
      const form = await service.getEntity('form', formId) || {};
      if (isNew && from) {
        delete form.model.id;
      }
      setForm(form);
      const forms = await service.searchEntity('form') || {};
      setFormIds(forms.data.map(x => x.model.id));
    };
    loadData();
  }, [match.params.formId, location.search]);

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
