/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

const mobileItemViewSizeCache = {};

export default (size) => {
  const key = size;
  if (!mobileItemViewSizeCache[key]) {
    mobileItemViewSizeCache[key] = {
      Wrapper: styled.div`
        color: #3d3d3d;
        background-color: #fff;
        height:100%;
        display: flex;
        flex-direction: column;
      `,
      Header: styled.div`
        background-color: #f0f0f0;
        font-size: 16px;
        padding: 10px 10px 10px ${10 + (size * 10)}px;
        display: flex;
        flex-direction: row;
        flex: 0 0 auto;
      `,
      Title: styled.div`
        font-size: 18px;
        font-weight: bold;
        flex: 1;
        line-height: 45px;
      `,
      Sections: styled.div`
        flex: 1;
        overflow-y: auto;
      `,
    };
  }
  return mobileItemViewSizeCache[key];
};

