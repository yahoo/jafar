/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { Field } from '@jafar/react-form';
import TextInput from '@jafar/react-components/edit/Text';
import Select from '@jafar/react-components/edit/Select';

export default {
  label: 'Options Actions',
  description: 'Represent menu options actions',
  path: 'item.optionsActions',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'optionsActionsForm',
      addModalTitle: 'Add options action',
      editModalTitle: 'Edit options action',
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

export const optionsActionsForm = {
  form: {
    model: {
      id: 'option-action',
      fields: {
        label: { 
          label: 'Label',
          path: 'label',
          required: true,
          component: { 
            name: 'TextInput',
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
      id: 'option-action',
      grid: getGrid([
        'label',
      ]),
    }],
  },
  itemRenderer: ({ label }) => (<div style={{ margin: '0 0 15px 0' }}>
    {label}
  </div>),
};
