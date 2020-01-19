/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useEffect } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createGenerateClassName, StylesProvider } from '@material-ui/styles';
import Styled from './components/StyledComponents';
import Demos from './components/Demos';

// StylesProvider + generateClassName fix isuue of css trubles when using material ui + styled components
// show wrap this solution above the root app
const generateClassName = createGenerateClassName({
  productionPrefix: 'jafar-react-form-demos',
});

const deafultDemoRoute = '/overview/introduction';

const Root = () => {
  useEffect(() => {
    const unsubscribeHashChange = window.addEventListener('hashchange', () => {
      window.parent.postMessage(location.hash, '*'); // eslint-disable-line
    });
    return () => unsubscribeHashChange && unsubscribeHashChange();
  }, []);

  return (<HashRouter basename="/">
    <StylesProvider generateClassName={generateClassName}>
      <Styled.RootElement id="jafar-react-form-demos">
        <Styled.GlobalStyle />
        <Styled.Header>
          <Styled.InternalLink id="logo" to={deafultDemoRoute}>
            <Styled.Logo src={require('./jafar.svg')} />
            <Styled.LogoText>Jafar | React Form Demos</Styled.LogoText>
          </Styled.InternalLink>
          <Styled.HeaderLinks>
            <Styled.ExternalLink href={process.env.REACT_APP_JAFAR_DOCS}>Docs</Styled.ExternalLink>
            <Styled.ExternalLink href={process.env.REACT_APP_JAFAR_GIT}>GitHub</Styled.ExternalLink>
          </Styled.HeaderLinks>
        </Styled.Header>
        <Route exact={true} path="/" render={shouldRedirect} />
        <Route 
          path="/:levelA/:levelB" 
          render={props => (<Styled.Wrapper id="demos"><Demos match={props.match} /></Styled.Wrapper>)} />
        {shouldRedirect()}
      </Styled.RootElement>
    </StylesProvider>
  </HashRouter>);
};

const shouldRedirect = () => {
  const paths = location && location.hash && location.hash.split('/'); //eslint-disable-line
  if (paths && paths[0] !== '' && paths.length === 2) {
    return (<Redirect to={deafultDemoRoute} />);
  }
  return null;
};

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));

  // hot reload
  if (module.hot) { module.hot.accept(); }
}

export default Root;
