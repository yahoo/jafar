/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (
  <Styled.P>
    Like Field component which uses context.form.fields[id] to get data of the field,
    More custom components can be created using the form context to their needs -
    such as displaying all the form's current errors in a single place (using context.form.fields[i].errors).
  </Styled.P>);
