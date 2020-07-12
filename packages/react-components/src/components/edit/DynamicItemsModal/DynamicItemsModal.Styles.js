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
	min-height: 40px;
	position: relative;
	&:hover div:nth-child(2){
		visibility: visible;
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
	visibility: hidden;
	position: absolute;
	right: 0;
	top: 0;
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
