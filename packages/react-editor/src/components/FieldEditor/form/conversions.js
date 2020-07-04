/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  unChanged: ({ value }) => value,
  falsyToUndefined: ({ value }) => !value ? undefined : value,
};
