/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export default (size, level) => ({
  Wrapper: styled.div`
    padding: ${() => (level === 1 ? `${(size * 8) + 18}px ${(size * 10) + 10}px ${size * 10}px ${(size * 10) + 10}px` : '0')};
    border-bottom: ${() => (level === 1 ? '1px solid #d8d8d8' : 'none')};
    &:last-child {
      border-bottom: none;
    }
  `,
  Title: styled.div`
    text-transform: uppercase;
    line-height: 1.1;
    color: inherit;
    font-size: ${() => (12 + (2 * size) + (level === 1 ? 2 : 0))}px;
    font-weight: ${() => level === 1 ? '500' : '400' };
    padding-bottom: ${() => ((size * 10) + 10)}px;
    margin: 0;
  `,
});
