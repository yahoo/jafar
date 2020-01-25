/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const A = styled.a`
  color: ${props => props.color};
  cursor: pointer;
  text-decoration: none;
  display: ${props => (props.maxLines ? '-webkit-box;' : 'initial')};
  -webkit-line-clamp: ${props => (props.maxLines ? props.maxLines : 'initial')};
  -webkit-box-orient: ${props => (props.maxLines ? 'vertical' : 'initial')};
  overflow: ${props => (props.maxLines ? 'hidden' : 'initial')};
  word-break: ${props => (props.maxLines ? 'break-all' : 'initial')};
  &:hover {
    text-decoration: underline;
  }
`;

export default {
  A,
};
