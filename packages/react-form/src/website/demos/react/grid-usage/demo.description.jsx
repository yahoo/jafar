/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  Form usage in a grid.
  Each row is wrapped with Form component which its data is the current row data.
  Each cell contains a Field component.
  Edit button click replaces the form definition for the specific row.
</Styled.P>);
