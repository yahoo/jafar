/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (
  <Styled.P>
    Formatter and Parser demo with dependenciesChange handler that changes the field value.
    Country and city fields have formatter and parser handlers (country / city code to country / city label).
    City field is dependent on country field. Each time country is changed - city changes its value
    to the capital city.
  </Styled.P>);
