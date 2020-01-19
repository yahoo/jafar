/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>Fetch asynchronous data. Use data prop on a Form component only when your data needs to be changed
  during the form lifecycle, and new data object generated outside of Form component (Internally, on init -  Form component
  assign data to the model object and pass the model as one object to the underline Form class instance, but
  when data prop reference changes it only call 'changeData' of the underline Form class instance).
</Styled.P>);
