/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<Styled.P>
  In order to change the model definition after the Form component first initiated,
  a new model object reference need to be passed to the Form component. This will re-init the
  Form component with the new model definition.
</Styled.P>);
