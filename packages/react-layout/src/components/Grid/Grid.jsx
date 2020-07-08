/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-areas: ${props => props.templateAreas.map(row => `"${row}"`).join(' ')};

  ${props => props.elements
    .map(element => `${element.selector} { grid-area: ${element.gridArea}; ${element.style || ''} }`)
    .join(' ')}
`;

export default Grid;
