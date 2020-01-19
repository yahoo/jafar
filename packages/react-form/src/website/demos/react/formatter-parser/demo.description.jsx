/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (
  <Styled.P>
    Field Age stored in the form data as a string number such as '18',
    but the number component that the field is using accept only numeric value.
    Therefor age defined formatter and parser functions.
  </Styled.P>);
