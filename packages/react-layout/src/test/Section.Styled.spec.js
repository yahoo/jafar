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
    { size: 1, root: true },
    { size: 1, root: false },
    { size: 2, root: true },
    { size: 2, root: false },
    { size: 3, root: true },
    { size: 3, root: false },
    { size: 4, root: true },
    { size: 4, root: false },
  ]
    .forEach(({ size, root }) => {
      describe(`size: ${size}, root: ${root}`, () => {
        const Styled = Style(size, root);
  
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
