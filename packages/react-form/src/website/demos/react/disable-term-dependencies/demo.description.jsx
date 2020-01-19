/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.Text>
  Following Fields include disable term:
  <ul>
    <li>Season Number is disabled when Content Type does not equal 'SERIES'.</li>
    <li>Episode Number is disabled when Content Type does not equal 'SERIES' or Season Number does not exist.</li>
  </ul>
</Styled.Text>);
