/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const Field = styled.div`
  margin: ${props => props.margin};
`;

export const Header = styled.div`
  margin: 0 0 10px 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
`;

export const Label = styled.div`
  margin: 0;
  display: inline-block;
  text-transform: uppercase;
  vertical-align: text-top;
  color: ${props => props.color};
`;

export const Description = styled.i`
  color: white;
  cursor: pointer;
  margin-left: 10px;
  background: #656364;
  padding: 1px 5px 1px 2px;
  border-radius: 10px;
  font-size: 10px;
`;

export const RequiredAsterisk = styled.div`
  margin-left: 3px;
  display: inline-block;
  color: ${props => props.color};
`;

export const Error = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${props => props.color};
`;

export default {
  Field,
  Header,
  Label,
  Description,
  RequiredAsterisk,
  Error,
};
