/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState, useEffect } from 'react';
import noop from 'lodash/noop';
import { withRouter } from 'react-router-dom';
import Grid from '../../../../components/Grid';
import service from '../../../service';
import { downloadJson } from '../../../../utils/download';
import { Wrapper, Title } from './Styled';
import baseRowActions from './row-actions';
import baseHeaderActions from './header-actions';

const loadData = async (name, setResult) => {
  const result = await service.searchEntity(name);
  setResult(result);
};

const List = ({ history, name, label = 'List', columns, headerActions = {}, rowActions = {}, onDelete = noop }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    loadData(name, setResult);
  }, [name]);

  const create = () => history.push({ pathname: `/${name}/new` });

  const edit = (entity) => history.push({ pathname: `/${name}/${entity.id}` });

  const duplicate = (entity) => history.push({ pathname: `/${name}/new`, search: `from=${entity.id}` });

  const download = (entity) => downloadJson(entity, entity.id);

  const remove = async (entity) => {
    debugger; // eslint-disable-line
    await onDelete(entity);
    await service.removeEntity(name, entity.id);
    await loadData(name, setResult);
  };

  return !result ? (null) : (
    <Wrapper id={`${name}-list`}>
      <Title>{label} ({result.count})</Title>
      <Grid        
        data={result.data}
        columns={columns({ edit })}
        headerActions={baseHeaderActions({ create }, headerActions)}
        rowActions={baseRowActions({ edit, duplicate, download, remove }, rowActions)} />
    </Wrapper>
  );
};

export default withRouter(List);
