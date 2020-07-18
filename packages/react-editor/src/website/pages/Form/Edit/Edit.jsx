/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import service from '../../../service';
import { FormEditor } from '../../../../components';
import Edit from '../../Base/Edit';
import components from '../../../components';

const NAME = 'form';

const generateId = form => form.model.id;

export default () => {
  const [formIds, setFormIds] = useState();

  useEffect(() => {
    const loadData = async () => {
      const forms = await service.searchEntity(NAME) || {};
      setFormIds(forms.data.map(x => x.model.id));
    };
    loadData();
  }, []);

  const renderEditor = ({ entity, onSave, onCancel }) => (<FormEditor 
    form={entity}
    formIds={formIds}
    components={components}
    fieldsLibrary={{
      // todo
    }}
    onSave={onSave} 
    onCancel={onCancel} />);
  
  return !formIds ? (null) : (<Edit name={NAME} generateId={generateId} renderEditor={renderEditor} />);
};
