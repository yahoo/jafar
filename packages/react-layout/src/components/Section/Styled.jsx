/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const sectionSizeCache = {};

export default (size, root) => {
  const key = `${size},${root}`;
  if (!sectionSizeCache[key]) {
    sectionSizeCache[key] = {
      Wrapper: styled.div`
        padding: ${() => (root ? `${(size * 8) + 18}px ${(size * 10) + 10}px ${size * 10}px ${(size * 10) + 10}px` : '0')};
        border-bottom: ${() => (root ? '1px solid #d8d8d8' : 'none')};
        &:last-child {
          border-bottom: none;
        }
      `,
      Title: styled.div`
        text-transform: uppercase;
        line-height: 1.1;
        color: inherit;
        font-size: ${() => (12 + (2 * size) + (root ? 2 : 0))}px;
        font-weight: ${() => root ? '500' : '400' };
        padding-bottom: ${() => ((size * 10) + 10)}px;
        margin: 0;
      `,
    };
  }
  return sectionSizeCache[key];
};
