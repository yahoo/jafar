/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import Grid from '../../../components/Grid';
import service from '../../service';
import { downloadJson } from '../../../utils/download';
import { Wrapper } from './Styled';
import baseRowActions from './row-actions';
import baseHeaderActions from './header-actions';

const loadData = async (name, setResult) => {
  const result = await service.searchEntity(name);
  setResult(result);
};

const List = ({ history, name, label = 'List', columns, headerActions = {}, rowActions = {} }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    loadData(name, setResult);
  }, [name]);

  const create = () => history.push({ pathname: `/${name}/new` });

  const edit = (entity) => history.push({ pathname: `/${name}/${entity.id}` });

  const duplicate = (entity) => history.push({ pathname: `/${name}/new`, search: `from=${entity.id}` });

  const download = (entity) => downloadJson(entity, entity.id);

  const remove = async (entity) => {
    await service.removeEntity(name, entity.id);
    await loadData(name, setResult);
  };

  return !result ? (null) : (
    <Wrapper id={`${name}-list`}>
      <h1>{label} ({result.count})</h1>
      <Grid        
        data={result.data}
        columns={columns({ edit })}
        headerActions={baseHeaderActions({ create }, headerActions)}
        rowActions={baseRowActions({ edit, duplicate, download, remove }, rowActions)} />
    </Wrapper>
  );
};

export default List;
