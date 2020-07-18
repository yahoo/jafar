/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import service from '../../../service';
import { FieldEditor } from '../../../../components';
import Edit from '../../Base/Edit';

const NAME = 'field';

export default () => {
  const [fieldIds, setFormIds] = useState();

  useEffect(() => {
    const loadData = async () => {
      const forms = await service.searchEntity(NAME) || {};
      setFormIds(forms.data.map(x => x.id));
    };
    loadData();
  }, []);

  const renderEditor = ({ entity, onSave, onCancel }) => {
    const save = async (args) => {
      // save to db
      await onSave(args);

      // update all referenced fields in the db
      const field = args.data;
      const forms = await service.searchEntity('form') || {};
      const referencedForms = forms.data.filter(form => (form.model.fields[field.id] || {})._referenced);
      referencedForms.forEach(form => {
        form.model.fields[field.id] = { ...field, _referenced: true };
        service.setEntity('form', form.id, form);
      });
    };

    return (<FieldEditor 
      field={entity}
      onSave={save} 
      onCancel={onCancel}
      fieldId={entity.id} 
      fieldIds={fieldIds} />);
  }
  
  return !fieldIds ? (null) : (<Edit name={NAME} renderEditor={renderEditor} />);
};
