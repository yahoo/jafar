/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Sections',
  path: 'item.sections',
  required: true,
  component: { 
    name: 'TextInput',
    state: {
      placeholder: 'Exclude action when...',
      multiline: true,
      rowsMax: 3,
    },
  },
};
