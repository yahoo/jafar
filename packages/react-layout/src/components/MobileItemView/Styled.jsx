/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const Wrapper = styled.div`
  color: #3d3d3d;
  background-color: #fff;
  height:100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #f0f0f0;
  font-size: 16px;
  padding: 10px 10px 10px 20px;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  line-height: 45px;
`;

const Sections = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default {
  Wrapper,
  Header,
  Title,
  Sections,
};