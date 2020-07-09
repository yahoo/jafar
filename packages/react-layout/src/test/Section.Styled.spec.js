/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import renderer from 'react-test-renderer';
import Style from '../components/Section/Styled';
import 'jest-styled-components';

describe('Styled', () => {
  [
    { size: 1, level: 1 },
    { size: 1, level: 2 },
    { size: 2, level: 1 },
    { size: 2, level: 2 },
    { size: 3, level: 1 },
    { size: 3, level: 2 },
    { size: 4, level: 1 },
    { size: 4, level: 2 },
  ]
    .forEach(({ size, level }) => {
      describe(`size: ${size}, level: ${level}`, () => {
        const Styled = Style(size, level);
  
        it('Wrapper', () => {
          const tree = renderer.create(<Styled.Wrapper />).toJSON();
          expect(tree).toMatchSnapshot();
        });
  
        it('Title', () => {
          const tree = renderer.create(<Styled.Title />).toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });  
});
