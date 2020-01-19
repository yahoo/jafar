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
  flex: 0 0 auto;
  padding: 0 50px;
  border-bottom: 3px solid #e1e1e1;
  position: relative;
  min-height: 48px;
  position: relative;
`;

const OptionsWrapper = styled.div`
  position: absolute;
  right: 15px;
  bottom: 0;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 500;
  margin: 0;
  padding: ${props => (props.hasTabs ? '25px 0 10px 0' : '25px 0')};
`;

const TabsWrapper = styled.div`
  position: relative;
  top: 3px;
  left: -10px;
`;

const Sections = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export default {
  Wrapper,
  Header,
  OptionsWrapper,
  Title,
  TabsWrapper,
  Sections,
};
