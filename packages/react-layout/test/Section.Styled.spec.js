/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import renderer from 'react-test-renderer';
import Styled from '../components/Section/Styled';
import './node_modules/jest-styled-components';

describe('Styled', () => {
  describe('Wrapper', () => {
    it('Should render with level one', () => {
      const tree = renderer.create(
        <Styled.Wrapper level={1} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render with level two', () => {
      const tree = renderer.create(
        <Styled.Wrapper level={2} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Title', () => {
    it('Should render with level one', () => {
      const tree = renderer.create(
        <Styled.Title level={1} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render with level two', () => {
      const tree = renderer.create(
        <Styled.Title level={2} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SmallWrapper', () => {
    it('Should render with level one', () => {
      const tree = renderer.create(
        <Styled.SmallWrapper level={1} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render with level two', () => {
      const tree = renderer.create(
        <Styled.SmallWrapper level={2} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SmallTitle', () => {
    it('Should render with level one', () => {
      const tree = renderer.create(
        <Styled.SmallTitle level={1} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should render with level two', () => {
      const tree = renderer.create(
        <Styled.SmallTitle level={2} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
