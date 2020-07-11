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
  id: 'ui',
  title: 'UI',
  grid: getGrid([
    'title        .              .',
    'layout       size           .',
  ]),
}, {
  id: 'actions',
  title: 'Actions',
  grid: getGrid([
    'mainActions  optionsActions .',
  ]),
}, {
  id: 'sections',
  title: 'Sections',
  grid: getGrid([
    'sections  sections .',
  ]),
}];
