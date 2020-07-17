/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import Grid from '../../../components/Grid';
import service from '../../service';
import { downloadJson, downloadFormFiles } from '../../../utils/download';
import { FormListWrapper } from './Styled';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

const FormList = ({ history }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const loadData = async () => {
      const forms = await service.searchEntity('form');
      setData(Object.values(forms));
    };
    loadData();
  }, []);

  const create = () => history.push({ pathname: `/form/new` });

  const edit = (form) => history.push({ pathname: `/form/${form.model.id}` });

  const download = (form) => downloadJson(form, form.model.id);

  const remove = async (form) => {
    await service.removeEntity('form', form.model.id);
    const forms = await service.searchEntity('form');
    setData(Object.values(forms));
  };

  return !data ? (null) : (
    <FormListWrapper id="form-list">
      <h1>Forms</h1>
      <div>
        <Grid        
          data={data}
          columns={columns({ edit })}
          headerActions={headerActions({ create })}
          rowActions={rowActions({ edit, download, downloadFormFiles, remove })} />
      </div>
    </FormListWrapper>
  );
};

export default FormList;
