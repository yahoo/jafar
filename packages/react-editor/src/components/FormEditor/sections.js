/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Field } from '@jafar/react-form';

const getGrid = (templateAreas) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    templateColumns: 'minmax(430px, 430px) minmax(0, 1fr) minmax(0, 1fr)',
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
      style: ['fields', 'layouts'].includes(id) ? undefined : 'max-width: 360px;',
    })),
  };
};

export default [{
  id: 'model',
  title: 'Model',
  grid: getGrid([
    'id fields fields',
    'data fields fields',
  ]),
}, {
  id: 'settings',
  title: 'Settings',
  grid: getGrid([
    'changeValueDebounceWait changeStateDebounceWait .',
    'changeValueDebounceMaxWait changeStateDebounceMaxWait .',
  ]),
}, {
  id: 'layouts',
  title: 'Layouts',
  grid: getGrid([
    'layouts layouts layouts',
  ]),
}];
