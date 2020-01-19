/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P> 
  If Subject is filled - then its value should be included in the Description field.
  Description is not required by default.
  Change Subject's value triggers Description to be evaluated (validates among other checks) and vice versa.
</Styled.P>);
