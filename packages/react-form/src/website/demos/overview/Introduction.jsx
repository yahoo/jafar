/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../components/StyledComponents';

export default () => (<Styled.HomeWrapper id="home">
  <div>
    <Styled.H2>Jafar | React Form Demos</Styled.H2>
    <p>View full list of react form demos from the left navigation</p>
    <Styled.H3>Common usages</Styled.H3>
    <Styled.Text>
      <ul>
        <li><Styled.A href="#/basics/create-form">
          How to create a simple form?</Styled.A></li>
        <li><Styled.A href="#/basics/path">
          How to define complicate field path?</Styled.A></li>
        <li><Styled.A href="#/basics/async-data">
          How to define a form when data is fetched asynchronous?</Styled.A></li>
        <li><Styled.A href="#/basics/async-state">
          How to change field component state when using presentational component?</Styled.A></li>
        <li><Styled.A href="#/validations/simple">
          How to validate a field?</Styled.A></li>
        <li><Styled.A href="#/validations/dependencies">
          How to validate a field after another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/exclude-term/context">
          How to exclude a field in some cases?</Styled.A></li>
        <li><Styled.A href="#/exclude-term/dependencies">
          How to exclude a field after another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/disable-term/context">
          How to disable a field in some cases?</Styled.A></li>
        <li><Styled.A href="#/disable-term/dependencies">
          How to disable a field after another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/require-term/context">
          How to require a field in some cases?</Styled.A></li>
        <li><Styled.A href="#/require-term/dependencies">
          How to require a field after another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/formatters-parsers/simple">
          How to use a component that accept different value structure than the field value?</Styled.A></li>
        <li><Styled.A href="#/dependencies/value-update">
          How to change a field value after another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/dependencies/value-state-update">
          How to change a field value or state after it's value or another field value has changed?</Styled.A></li>
        <li><Styled.A href="#/others/custom-field-view">
          How to customize the field view?</Styled.A></li>
        <li><Styled.A href="#/others/persistency">
          How to persist a from?</Styled.A></li>
      </ul>
    </Styled.Text>
  </div>
</Styled.HomeWrapper>);
