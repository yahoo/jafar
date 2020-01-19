/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';

const List = styled(MUIList)`
  width: 300px;
  background-color: #fff;
  [id="/overview/introduction"] {
    display: none;
  }
`;

const ListItem = styled(MUIListItem)`
  padding-left: ${props => `${props.level * 15}px !important`};
`;

export default {
  List,
  ListItem,
};
