/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import ReactDOM from 'react-dom';
import { createGenerateClassName, StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Styled from './Styled';
import Home from './pages/Home';
import FormEdit from './pages/FormEdit';
import FormList from './pages/FormList';

const generateClassName = createGenerateClassName({ productionPrefix: 'jafar-react-editor' });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F9970D',
    },
    secondary: {
      main: '#879CA9',
    },
  },
});

const Root = () => {
  return ( 
    <HashRouter basename="/">
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Styled.GlobalStyle />
          <Styled.Header>
            <Styled.InternalLink id="logo" to="/">
              <Styled.Logo src={require('./jafar.svg')} />
              <Styled.LogoText>Jafar | React Editor</Styled.LogoText>
            </Styled.InternalLink>
            <Styled.HeaderLinks>
              <Styled.ExternalLink href={process.env.REACT_APP_JAFAR_DOCS}>Docs</Styled.ExternalLink>
              <Styled.ExternalLink href={process.env.REACT_APP_JAFAR_GIT}>GitHub</Styled.ExternalLink>
            </Styled.HeaderLinks>
          </Styled.Header>
          <Styled.Main id="jafar-react-editor-demos">
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/form/:formId" component={FormEdit} />
              <Route exact={true} path="/form/" component={FormList} />
            </Switch>
          </Styled.Main>
        </ThemeProvider>
      </StylesProvider>
    </HashRouter>
  );
};

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));
  if (module.hot) { module.hot.accept(); }
}

export default Root;
