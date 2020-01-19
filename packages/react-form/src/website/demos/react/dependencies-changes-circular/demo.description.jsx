/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Styled from '../../../components/StyledComponents';

export default () => (<React.Fragment>
  <Styled.P>Circular dependencies can happen only if those 4 terms are happening together</Styled.P>

  <Styled.Text>
    <ul>
      <li>Field “b” defined that dependency on field “a” (field.dependencies = [‘a’])</li>
      <li>Field “a” defined that dependency on field “b” (field.dependencies = [‘b’])</li>
      <li>Field “b” defined a “field.dependenciesChange” func that return “value” change</li>
      <li>Field “a” defined a “field.dependenciesChange” func that return “value” change</li>
    </ul>
  </Styled.Text>

  <Styled.P>The circular dependencies can happen also on a larger chain like “a -> b -> c -> d -> a”</Styled.P>

  <Styled.P>We might also have a non circular case like:</Styled.P>
  <Styled.Text>
    <ul>
      <li>“a” changes -></li>
      <li>triggers “b” to change its value (in dependencyChange func we return value to change) -></li>
      <li>triggers “a” to change its value (in dependencyChange func we return value to change) -></li>
      <li>triggers “b” to only evaluate (in dependencyChange func now we return undefined to just evaluate field)</li>
    </ul>
  </Styled.Text>

  <Styled.P>Circular dependencies stops after maximum change value loops, and throws error to the
    console will the loop's details</Styled.P>

</React.Fragment>);
