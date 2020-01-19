/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Styled from '../src/components/StyledComponents.jsx';

describe('StyledComponents', () => {
  it('StyledComponents has Field and it wrapped up', async () => {
    const element = shallow(<Styled.Field><div>Some Mock Content</div></Styled.Field>);
    expect(element).toBeTruthy();
    expect(element.html()).toContain('Mock');
  });

  it('StyledComponents has Header', () => {
    const element = shallow(<Styled.Header />);
    expect(element).toBeTruthy();
  });

  it('StyledComponents has Label', () => {
    const element = shallow(<Styled.Label color="gold" />);
    expect(element).toBeTruthy();
    expect(element.html()).toContain('gold');
  });

  it('StyledComponents has Description', () => {
    const element = shallow(<Styled.Description />);
    expect(element).toBeTruthy();
  });

  it('StyledComponents has RequiredAsterisk', () => {
    const element = shallow(<Styled.RequiredAsterisk color="gold" />);
    expect(element).toBeTruthy();
    expect(element.html()).toContain('gold');
  });

  it('StyledComponents has Error', () => {
    const element = shallow(<Styled.Error color="gold" />);
    expect(element).toBeTruthy();
    expect(element.html()).toContain('gold');
  });
});
