/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import renderer from 'react-test-renderer';
import Style from '../components/MobileItemView/Styled';
import 'jest-styled-components';

describe('Styled', () => {
  [
    { size: 1 },
    { size: 2 },
    { size: 3 },
    { size: 4 },
  ]
    .forEach(({ size }) => {
      const Styled = Style(size);
      describe(`size: ${size}`, () => {
        it('Wrapper', () => {
          const tree = renderer.create(<Styled.Wrapper />).toJSON();
          expect(tree).toMatchSnapshot();
        });
        it('Sections', () => {
          const tree = renderer.create(<Styled.Sections />).toJSON();
          expect(tree).toMatchSnapshot();
        });
        it('Header', () => {
          const tree = renderer.create(<Styled.Header />).toJSON();
          expect(tree).toMatchSnapshot();
        });
        it('Title', () => {
          const tree = renderer.create(<Styled.Title />).toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
});
