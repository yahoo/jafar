/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default function () {
  return (
    <React.Fragment>
      <Styled.P>
        Basic usage of Form component and sub context components (such as Field).
        Form component provides context object which contains the form model, resources and actions.
        All child components can gain access to that context and use it (direct or indirect children).
        Field component is a specific child component that access the Form's context, as well as the custom demo components -
        ResetButton, SaveButton and DataViewer.
      </Styled.P>
      <Styled.P>
        This is the basic usage for Form component.
        The rest of the demos will use the createForm helper function to create a form.
      </Styled.P>
      <Styled.P>
        Note: notice not to define model object in the render function - since each render creates a new model
        instance and when the Form components gets a new model instance - it will re-init. Best practice it to pass
        from outside the render, or to keep it in some component internal and pass it from there.
      </Styled.P>
    </React.Fragment>);
}
