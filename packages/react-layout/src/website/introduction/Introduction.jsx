/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../components/StyledComponents';

export default () => (<Styled.HomeWrapper id="home">
  <div>
    <Styled.H2>Jafar | React Layout Demos</Styled.H2>
    <p>View full list of react layout demos from the left navigation</p>
    <Styled.H3>Common usages</Styled.H3>
    <Styled.Text>
      <ul>
        <li><Styled.A href="#/item/layouts">
          How to create a form with page layout (such as create / edit / details pages)?</Styled.A></li>
        <li><Styled.A href="#/item/responsive">
          How to create a form with responsive page layout (such as create / edit / details responsive pages)?</Styled.A></li>
        <li><Styled.A href="#/item/sections">
          How to create a form with sections?</Styled.A></li>
      </ul>
    </Styled.Text>
  </div>
</Styled.HomeWrapper>);
