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

const columnStyleTerm = {
  width: '100%',
  maxWidth: '100%',
  margin: '0 30px 0 0',
};

export default [{
  id: 'basic',
  title: 'Basic',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'id' } },
        { component: Field, props: { id: 'path' } },
      ],
    }, {
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'dependencies' } },
        { component: Field, props: { id: 'dependenciesChange' } },
      ],
    }],
  }],
}, {
  id: 'validations',
  title: 'Validations',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'required' } },

      ],
    }, {
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'validators' } },
      ],
    }],
  }],
}, {
  id: 'terms',
  title: 'Terms',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyleTerm,
      boxes: [
        { component: Field, props: { id: 'disableTerm' } },
        { component: Field, props: { id: 'excludeTerm' } },
        { component: Field, props: { id: 'requireTerm' } },
      ],
    }],
  }],
}, {
  id: 'ui',
  title: 'UI',
  boxes: [{
    direction: 'row',
    boxes: [{
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'label' } },
        { component: Field, props: { id: 'component' } },
      ],
    }, {
      direction: 'column',
      style: columnStyle,
      boxes: [
        { component: Field, props: { id: 'description' } },
        { component: Field, props: { id: 'formatter' } },
        { component: Field, props: { id: 'parser' } },
      ],
    }],
  }],
}];
