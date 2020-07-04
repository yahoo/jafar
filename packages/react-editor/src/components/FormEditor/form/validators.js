/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  uniqueId: {
    func: ({ value, context }) => !context.formIds.includes(value),
    message: () => 'Id already exists',
  },
};
