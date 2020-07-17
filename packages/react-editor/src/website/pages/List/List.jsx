/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import Grid from '../../../components/Grid';
import service from '../../service';
import { downloadJson, downloadFormFiles } from '../../../utils/download';
import { Wrapper } from './Styled';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

const loadData = async (name, setResult) => {
  const result = await service.searchEntity(name);
  setResult(result);
};

const List = ({ history, name, label }) => {
  const [result, setResult] = useState();

  useEffect(() => loadData(name, setResult), []);

  const create = () => history.push({ pathname: `/${name}/new` });

  const edit = (entity) => history.push({ pathname: `/${name}/${entity.id}` });

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
        headerActions={headerActions({ create })}
        rowActions={rowActions({ edit, download, downloadFormFiles, remove })} />
    </Wrapper>
  );
};

export default List;
