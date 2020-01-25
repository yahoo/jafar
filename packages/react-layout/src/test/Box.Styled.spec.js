/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import renderer from 'react-test-renderer';
import Styled from '../components/Box/Styled';
import 'jest-styled-components';

describe('Styled', () => {
  describe('Row', () => {
    it('Should render ok', () => {
      const tree = renderer.create(
        <Styled.Row />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Column', () => {
    it('Should render ok', () => {
      const tree = renderer.create(
        <Styled.Column />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render ok - with style', () => {
      const tree = renderer.create(
        <Styled.Column style={{ width: '400px', maxWidth: '400px', margin: '50px 0' }} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
