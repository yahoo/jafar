/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { Field } from '@jafar/react-form';
import TextInput from '@jafar/react-components/edit/Text';
import Select from '@jafar/react-components/edit/Select';

export default {
  label: 'Main Actions',
  description: 'Represent footer actions (buttons for save, cancel and more)',
  path: 'item.mainActions',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'mainActionsForm',
      addModalTitle: 'Add main action',
      editModalTitle: 'Edit main action',
    },
  },
};

const getGrid = (templateAreas) => {
  const fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  return {
    templateAreas,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
      style: 'width:300px',
    })),
  };
};

export const mainActionsForm = {
  form: {
    model: {
      id: 'main-action',
      fields: {
        label: { 
          label: 'Label',
          path: 'label',
          required: true,
          component: { 
            name: 'TextInput',
          },
        },
        type: { 
          label: 'Type', 
          path: 'type', 
          component: { 
            name: 'Select', 
            state: { 
              items: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Tertiary', value: 'tertiary' },
              ],
            },
          },
        },
      },
      data: { type: 'primary' },
    },
    resources: {
      components: { 
        TextInput,
        Select,
      },
    },
  },
  item: {
    size: 0,
    sections: [{
      id: 'main-action',
      grid: getGrid([
        'label',
        'type',
      ]),
    }],
  },
  itemRenderer: ({ label, type }) => (<div style={{ margin: '0 0 15px 0' }}>
    {label} {type ? `(${type})` : ''}
  </div>),
};
