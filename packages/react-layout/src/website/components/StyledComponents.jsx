/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled, { createGlobalStyle } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Root = styled.div`
  margin-bottom: 60px;
`;

export const Main = styled.div`
  background: #fafafa;
  padding: 40px;
  margin: 40px 0;
  border-radius: 10px;
`;

export const MainElement = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-right: 40px;
  width: 320px;
`;

export const ItemWrapper = styled.div`
  height: 540px;
  box-shadow: 0px 0px 5px 1px #21212126;
  overflow:scroll;
`;

export const SectionTitle = styled.h4`
  margin-top: 0;
`;

export const P = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

export const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

export const H3 = styled.h3`
  font-weight: 400;
`;

const GlobalStyle = createGlobalStyle`
html, body, #root {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
pre {
  font-size: 12px !important;
  background: #fafafa !important;
  padding: 20px !important;
  border-radius: 10px;
}
.MuiInput-root, .MuiFormControl-root {
  width: 100%;
}
`;

const RootElement = styled.div`
  margin: -8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
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
  margin-top: 11px;
  margin-right: 15px;
`;

const LogoText = styled.div`
  display: inline-block;
  position: relative;
  top: -20px;
  font-weight: 500;
`;

const HeaderLinks = styled.div`
  position: absolute;
  right: 150px;
  top: 0px;
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

const DemoLink = styled(NavLink)`
  color: #F9970F;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  &.${props => props.activeClassName} { 
    text-decoration: underline;
  }
`;
DemoLink.defaultProps = {
  activeClassName: 'active',
};

const A = styled.a`
  color: #F9970F;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow-y:auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  border-right: 1px solid #ddd;
  overflow-y:auto;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px 40px;
  overflow-y: auto;
  background-color: #f2f5f9;
`;

const ExampleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 60px;
  overflow-y: auto;
  background-color: #fff;
`;

const ExampleHtml = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: row;
`;

const H2 = styled.h2`
  font-weight: 400;
  margin-top: 0px;
`;

export default {
  Root,
  Main,
  MainElement,
  ItemWrapper,
  SectionTitle,
  P,
  Text,
  H3,
  GlobalStyle,
  RootElement,
  Header,
  HeaderLinks,
  Logo,
  LogoText,
  InternalLink,
  ExternalLink,
  DemoLink,
  A,
  Wrapper,
  MenuWrapper,
  ExampleWrapper,
  ExampleHtml,
  MainWrapper,
  HomeWrapper,
  H2,
};
