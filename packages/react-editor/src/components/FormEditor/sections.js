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

export default [{
  id: 'model',
  title: 'Model',
  boxes: [{
    direction: 'column',
    style: columnStyleWide,
    boxes: [{
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'id' } },
  
      ],
    }, {
      direction: 'column',
      style: columnStyleWide,
      boxes: [
        { component: Field, props: { id: 'fields' } },
        { component: Field, props: { id: 'data' } },
  
      ],
    }],
  }],
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
