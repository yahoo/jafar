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

function getColumn(fieldIds) {
  return {
    direction: 'column',
    style: columnStyle,
    boxes: fieldIds.map(id => ({ component: Field, props: { id } })),
  };
}

export default [{
  id: 'ui',
  title: 'UI',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['title', 'layout', 'size']),
      getColumn(['sections'])],
  }],
}, {
  id: 'actions',
  title: 'Actions',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['mainActions']),
      getColumn(['optionsActions'])],
  }],
}];
