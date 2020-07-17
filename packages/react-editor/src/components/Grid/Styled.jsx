/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const HeaderButton = styled(Button)`
  margin-left: 10px !important;
`;

export const Grid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 40px;
  [aria-label="actions"] {
    visibility: hidden;
  }
  &:hover {
    [aria-label="actions"] {
      visibility: visible;
    }
  }
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:nth-child(odd) {
    background-color: #f1f1f1;
  }
`;

export const HeaderRow = styled(Row)`
  font-weight: bold;
  background-color: #e0e0e0 !important;
`;

export const Cell = styled.div`
  padding: 10px 20px;
  flex: ${props => props.minWidth ? 'unset' : 1 };
  min-width: ${props => props.minWidth};
  overflow: hidden;
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const HeaderMenu = styled.div`
  text-align: right;
  padding-bottom: 10px;
`;
