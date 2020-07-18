/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import service from '../../../service';

const _generateId = (entity) => entity.id || Math.random().toString(16).slice(2);

const Edit = ({ name, generateId = _generateId, renderEditor, match, location, history }) => {
  const [entity, setEntity] = useState();

  useEffect(() => {
    const loadData = async () => {
      const params = new URLSearchParams(location.search); 
      const fromAnotherId = params.get('from');
      const isNew = match.params.id === 'new' && !fromAnotherId;
      const isClone = match.params.id === 'new' && fromAnotherId;
      const entityId = isClone ? fromAnotherId : match.params.id;
      const entity = isNew ? {} : (await service.getEntity(name, entityId) || {});
      if (isClone) {
        delete entity.id;
      }
      setEntity(entity);
    };
    loadData();
  }, [match.params.id, location.search, name]);

  const onSave = async ({ data }) => {
    await service.setEntity(name, generateId(data), data);
    onCancel();
  };

  const onCancel = () => history.push({ pathname: `/${name}` });

  return entity ? renderEditor({ entity, onSave, onCancel }) : (null);
};

export default withRouter(Edit);
