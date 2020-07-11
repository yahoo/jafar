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
  id: 'item',
  title: 'Item',
  grid: getGrid([
    'title    mainActions  optionsActions',
    'layout   mainActions  optionsActions',
    'size     mainActions  optionsActions',
  ]),
}];
