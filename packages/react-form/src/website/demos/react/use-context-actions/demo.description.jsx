/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<React.Fragment>
  <Styled.P>Use form's context actions to manipulate the form. The bellow buttons calls actions from the context.</Styled.P>
  <Styled.P>Actions duration is a direct result of:</Styled.P>
  <Styled.Text>
    <ul>
      <li>Form's internal state updates number</li>
      <li>Number of fields which evaluated in the specific action
        (such as init evaluates all fields as suppose to changeValue that evaluates only the specific field and its
          dependencies)</li>
      <li>Handler's duration (such as specific validator / stateChange / more handlers can take some time,
        especially if they are async functions)</li>
      <li>For changeValue and changeState actions there is additional minimum 250ms debounce time</li>
    </ul>
  </Styled.Text>
</React.Fragment>);
