/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ActionsMenu from '../ActionsMenu';
import * as Styled from './Styled';

const Grid = ({ columns, data, headerActions, rowActions }) => {  
  return (<Styled.Grid aria-label="grid">
    <Styled.HeaderMenu aria-label="grid-header-menu">
      {
        headerActions.map((action, index) => (<Styled.HeaderButton key={index} variant={action.variant || 'contained'} 
          color="primary" onClick={action.onClick}>{action.label}</Styled.HeaderButton>))
      }
    </Styled.HeaderMenu>
    <Styled.HeaderRow>
      {
        columns.map((column, index) => (<Styled.Cell key={index}>{column.label}</Styled.Cell>))
      }
      {
        rowActions && <Styled.Cell minWidth="50px" />
      }
    </Styled.HeaderRow>
    <Styled.Body aria-label="grid-body">
      {
        data.map((row, index) => (<Styled.Row key={index} aria-label="grid-row">
          {
            columns.map((column, index2) => (<Styled.Cell key={index2}>{column.content(row)}</Styled.Cell>))
          }
          {
            rowActions && <Styled.Cell minWidth="50px">
              <ActionsMenu data={row} options={rowActions} />
            </Styled.Cell>
          }
        </Styled.Row>))
      }
    </Styled.Body>
  </Styled.Grid>);
};

export default Grid;
