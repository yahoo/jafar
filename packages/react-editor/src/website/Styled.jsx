/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled, { createGlobalStyle } from 'styled-components';
import { NavLink } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`

html, body, #root {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  margin: 0;
}
.MuiInput-root, .MuiFormControl-root {
  width: 100%;
}
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  background: #454F55;
  color: #fff;
  font-weight: bold;
  height: 50px;
  min-height: 50px;
  padding: 0 0 0 80px;
  line-height: 50px;
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
  margin-top: 10px;
  margin-right: 15px;
`;

const LogoText = styled.div`
  display: inline-block;
  position: relative;
  top: -20px;
  font-weight: 500;
`;

const InternalLink = styled(NavLink)`
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  font-weight: 100;
  color: #fff;
  text-decoration: none;
  &.${props => props.activeClassName} { 
    font-weight: 600;
  }
`;
InternalLink.defaultProps = {
  activeClassName: 'active',
};

const HeaderLinks = styled.div`
  position: absolute;
  right: 150px;
  top: 0px;
`;

const ExternalLink = styled.a`
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  font-weight: 100;
  color: #fff;
  text-decoration: none;
  &:hover {
    font-weight: 600;
  }
`;

export default {
  GlobalStyle,
  Main,
  Header,
  InternalLink,
  Logo,
  LogoText,
  HeaderLinks,
  ExternalLink,
};
