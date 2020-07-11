/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { Field } from '@jafar/react-form';
import TextInput from '@jafar/react-components/edit/Text';
import Grid from '@jafar/react-layout/Grid';
import { withTheme } from '@material-ui/core/styles';

export default {
  label: 'Sections',
  path: 'item.sections',
  component: {
    name: 'DynamicItemsModal',
    state: { 
      resourceId: 'sectionsForm',
      addModalTitle: 'Add section',
      editModalTitle: 'Edit section',
    },
  },
};

const getGrid = (templateAreas, component) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x && x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component, 
      props: { id },
    })),
  };
};

const FieldName = withTheme(({ id, theme }) => (<div id={id} 
  style={{ 
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '0 15px',
    margin: '0 15px 15px 0',
    lineHeight: '48px',
  }}>
  {id}</div>));

export const sectionsForm = {
  form: {
    model: {
      id: 'section',
      fields: {
        id: { 
          label: 'Id',
          path: 'id',
          required: true,
          component: { 
            name: 'TextInput',
          },
        },
        title: { 
          label: 'Title',
          path: 'title',
          component: { 
            name: 'TextInput',
          },
        },
        grid: { 
          label: 'Grid',
          description: 'Represent css grid attribute - grid-template-areas',
          path: 'grid',
          component: { 
            name: 'TextInput',
            state: {
              multiline: true,
              rowsMax: 100,
            },
          },
        },

      },
    },
    resources: {
      components: { 
        TextInput,
      },
    },
  },
  item: {
    size: 0,
    sections: [{
      id: 'section',
      grid: getGrid([
        'id title',
        'grid grid',
      ], Field),
    }],
  },
  itemRenderer: (item, index) => (<div>
    <div>{index + 1}. {item.title}</div>
    <Grid {...getGrid(item.grid, FieldName)} />
  </div>),
  style: { 
    list: { maxHeight: 'none' },
    item: { marginBottom: '15px' },
  },
};
