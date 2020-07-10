/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Field } from '@jafar/react-form';

const columnStyle = {
  width: '400px',
  maxWidth: '400px',
  margin: '0 30px 0 0',
};

const columnStyleWide = {
  width: '100%',
  minWidth: '400px',
  maxWidth: '100%',
  margin: '0 30px 0 0',
};

const getGrid = (templateAreas) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
      // style: 'min-width: 360px;',
    })),
  };
};

export default [{
  id: 'model',
  title: 'Model',
  grid: getGrid([
    'id . fields fields',
    'data . fields fields',
  ]),
}, {
  id: 'settings',
  title: 'Settings',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'changeValueDebounceWait' } },
        { component: Field, props: { id: 'changeValueDebounceMaxWait' } },
      ],
    }, {
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'changeStateDebounceWait' } },
        { component: Field, props: { id: 'changeStateDebounceMaxWait' } },
      ],
    }],
  }],
}, {
  id: 'layouts',
  title: 'Layouts',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyleWide,
      boxes: [
        { component: Field, props: { id: 'layouts' } },
      ],
    }],
  }],
}];
