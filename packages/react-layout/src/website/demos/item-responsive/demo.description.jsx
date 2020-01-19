/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../components/StyledComponents';

export default function () {
  return (
    <React.Fragment>
      <Styled.P>
        Responsive Item using 'react-breakpoints' with debounce delay of 200ms.
        Each screen size can define different item settings such as sections. Try to change screen size
      </Styled.P>
    </React.Fragment>);
}
