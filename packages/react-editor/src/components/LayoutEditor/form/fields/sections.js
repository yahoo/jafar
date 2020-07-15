/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import { Field } from '@jafar/react-form';
import Grid from '@jafar/react-layout/Grid';
import TextInput from '@jafar/react-components/edit/Text';
import GridTemplateAreas from '../components/GridTemplateAreas';

const SectionViewItem = styled.div`
  margin-bottom: 20px;
  > div:first-child {
    font-weight: bold;
    margin-bottom: 10px;  
  }
  > div:nth-child(2) {
    background: #f9f9f9;
    padding: 15px;
  }
`;

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

const getGrid = (component, templateAreas, templateColumns) => {
  let fieldIds = templateAreas.join(' ').split(' ').filter(x => x && x !== '.');
  fieldIds = [...(new Set(fieldIds))];
  return {
    templateAreas,
    templateColumns,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component, 
      props: { id },
    })),
  };
};

const FieldName = ({ id, theme }) => (<div id={id} 
  style={{
    border: '1px solid #d2d2d2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 15px',
    lineHeight: '48px',
    background: '#ffffff',
  }}>
  {id}</div>);

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
        gridTemplateAreas: { 
          label: 'Grid Template Areas',
          description: 'Represent css grid attribute - grid-template-areas',
          path: 'grid.templateAreas',
          required: true,
          component: { 
            name: 'GridTemplateAreas',
          },
        },
        gridTemplateColumns: { 
          label: 'Grid Template Columns',
          description: 'Represent css grid attribute - grid-template-columns',
          path: 'grid.templateColumns',
          component: { 
            name: 'TextInput',
            state: {
              placeholder: 'Example: repeat(3, minmax(0, 1fr))',
            },
          },
        },
      },
    },
    resources: {
      components: { 
        TextInput,
        GridTemplateAreas,
      },
    },
  },
  item: {
    size: 0,
    sections: [{
      id: 'section',
      grid: getGrid(Field, [
        'id title',
        'gridTemplateAreas gridTemplateAreas',
        'gridTemplateColumns gridTemplateColumns',
      ]),
    }],
  },
  itemRenderer: (item) => (<SectionViewItem>
    <div>{item.title}</div>
    <Grid {...getGrid(FieldName, item.grid.templateAreas, item.grid.templateColumns)} gap="15px" />
  </SectionViewItem>),
  style: { 
    list: { maxHeight: 'none' },
    item: { marginBottom: '15px' },
  },
};
