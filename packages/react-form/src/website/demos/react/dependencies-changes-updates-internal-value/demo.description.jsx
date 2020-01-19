/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  Internal field Welcome Message depends on Name field.
  Welcome Message changes its value each time Name field is changed.
  Enter a name to see welcome message updates in the data viewer
</Styled.P>);
