/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  Field Reset Password has a single exclude term.
  Field will be excluded for non-admin users. Click on switch user to see the different cases.
  Note - Use context prop on a Form component only when your context needs to be changed
  during the form lifecycle, and new context object generated outside of Form component (Internally, on init -  Form component
  assign context to the model object and pass the model as one object to the underline Form class instance, but
  when context prop reference changes it only call 'changeData' of the underline Form class instance).
</Styled.P>);
