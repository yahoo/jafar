/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  max-width: ${props => props.maxWidth};
  margin: ${props => props.margin};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default {
  Column,
  Row,
};
