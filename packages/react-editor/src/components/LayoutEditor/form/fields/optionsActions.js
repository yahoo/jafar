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
        onClick: { 
          label: 'On Click',
          description: 'Describes what to do when an action is clicked',
          path: 'onClick',
          component: { 
            name: 'TextInput',
            state: {
              placeholder: 'On click do...',
              multiline: true,
              rowsMax: 3,
            },
          },
        },
        disable: { 
          label: 'Disable',
          description: 'Describes when the action should be disabled',
          path: 'disable',
          component: { 
            name: 'TextInput',
            state: {
              placeholder: 'Disable action when...',
              multiline: true,
              rowsMax: 3,
            },
          },
        },
        exclude: { 
          label: 'Exclude',
          description: 'Describes when the action should be excluded',
          path: 'exclude',
          component: { 
            name: 'TextInput',
            state: {
              placeholder: 'Exclude action when...',
              multiline: true,
              rowsMax: 3,
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
      id: 'option-action',
      grid: getGrid([
        'label onClick',
        'disable exclude',
      ]),
    }],
  },
  itemRenderer: (item, index) => (<div style={{ margin: '0 0 15px 0' }}>
    <div>{index + 1}. {item.label}</div>
    <ul style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
      { item.onClick && <li>onClick: {item.onClick}</li> }
      { item.disable && <li>disable: {item.disable}</li> }
      { item.exclude && <li>exclude: {item.exclude}</li> }
    </ul>
  </div>),
  style: { 
    list: { maxHeight: 'none' },
    item: { marginBottom: '15px' },
  },
};
