/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  Form has a form level validator which checks on submit if field 'email' is unique.
  Type 'ross@friends.com' or 'monica@friends.com' in email field to see form validator 
  return errors and submit hook is not called.
</Styled.P>);
