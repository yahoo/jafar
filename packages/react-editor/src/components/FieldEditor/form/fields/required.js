/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Required',
  description: 'Reflects whether the user must enter a value',
  path: 'required',
  component: {
    name: 'Checkbox',
    state: {
      label: 'Enabled',
    },
  },
  formatter: { name: 'unChanged' },
  parser: { name: 'falsyToUndefined' },
};
