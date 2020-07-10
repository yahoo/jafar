/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  formIdStateChange: ({ state, context }) => {
    if (!state.item) {
      return { ...state, items: context.formIds };
    }
    return undefined;
  },
};
