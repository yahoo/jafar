/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.Text>
  Following Fields include exclude term:
  <ul>
    <li>Season Number is excluded when Content Type does not equal 'SERIES'.</li>
    <li>Episode Number is excluded when Content Type does not equal 'SERIES' or Season Number does not exist.</li>
  </ul>
</Styled.Text>);
