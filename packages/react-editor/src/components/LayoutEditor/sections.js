/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Field } from '@jafar/react-form';

const getGrid = (templateAreas) => {
  const fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  return {
    templateAreas,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
      style: 'width: 350px;',
    })),
  };
};

export default [{
  id: 'form',
  title: 'Form',
  grid: getGrid([
    'formId   .   .',
  ]),
}, {
  id: 'item',
  title: 'Item',
  grid: getGrid([
    'title    .  .',
    'layout   .  .',
    'size     .  .',
  ]),
}];
