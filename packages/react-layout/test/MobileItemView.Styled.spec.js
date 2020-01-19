/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import renderer from 'react-test-renderer';
import Styled from '../src/components/MobileItemView/Styled';
import 'jest-styled-components';

describe('Styled', () => {
  describe('Title', () => {
    it('Should render ok', () => {
      const tree = renderer.create(
        <Styled.Title hasTabs={false} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render ok - with tabs', () => {
      const tree = renderer.create(
        <Styled.Title hasTabs={true} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
