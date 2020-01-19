/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const ItemsListContainer = styled.ul`
	list-style: none;
	padding: 0;
	max-height: 180px;
	overflow-y: auto;
`;

const ListItem = styled.li`
	display: flex;
	line-height: 40px;
	&:hover {
		background-color: #f7f7f7;
	}
	&:hover div:nth-child(2){
		display:block;
	}
`;

const ItemRendererContainer = styled.div`
	justify-content: flex-start;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const ActionsContainer = styled.div`
	justify-content: flex-end;
	display: none;
`;

const AddLabel = styled.span`
	text-transform: uppercase;
	margin-left: 10px;
	font-size: 16px;
	line-hight: 16px;
	cursor: default;
`;

export default {
  ItemsListContainer,
  ItemRendererContainer,
  ActionsContainer,
  ListItem,
  AddLabel,
};
