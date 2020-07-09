/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${props => (props.level === 1 ? '0 50px 40px 50px' : '0')};
  border-bottom: ${props => (props.level === 1 ? '1px solid #d8d8d8' : 'none')};
  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h3`
  text-transform: uppercase;
  line-height: 1.1;
  color: inherit;
  font-size: ${props => (props.level === 1 ? '21px' : '16px')};
  font-weight: ${props => (props.level === 1 ? '500' : '400')};
  padding: ${props => (props.level === 1 ? '50px 0' : '40px 0')};
  margin: 0;
`;

const SmallWrapper = styled.div`
  padding: ${props => (props.level === 1 ? '0 20px 10px 20px' : '0')};
  border-bottom: ${props => (props.level === 1 ? '1px solid #d8d8d8' : 'none')};
  &:last-child {
    border-bottom: none;
  }
`;

const SmallTitle = styled.h3`
  text-transform: uppercase;
  line-height: 1.1;
  color: inherit;
  font-size: ${props => (props.level === 1 ? '19px' : '16px')};
  font-weight: ${props => (props.level === 1 ? '500' : '400')};
  padding: ${props => (props.level === 1 ? '40px 0' : '30px 0')};
  margin: 0;
`;

export default {
  Wrapper,
  Title,
  SmallWrapper,
  SmallTitle,
};
