/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.Text>
  After each action - save the form model to the local storage.
  On refresh - load the form model from the local storage and pass it to the Form component
  in order to restore it to its last state.
  Change the fields and refresh the page - to view form persistency.
</Styled.Text>);
