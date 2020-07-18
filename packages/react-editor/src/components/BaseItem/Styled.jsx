/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;

  > div {
    flex: 1;
  }
`;

const JsonViewWrapper = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  max-width: 500px;
  border-left: 1px solid #e1e1e1;
  background-color: rgb(252, 253, 253);
`;

export default {
  Wrapper,
  JsonViewWrapper,
};
