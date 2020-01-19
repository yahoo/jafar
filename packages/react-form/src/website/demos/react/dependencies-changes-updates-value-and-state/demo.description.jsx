/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  Field Hobbies depends on field Name.
  Hobbies changes its value and state each time Name field is changed
  (changing Name triggers Hobbies items and search to be cleared).
</Styled.P>);
