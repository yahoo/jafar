/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Id',
  description: 'Unique field ID',
  path: 'id',
  required: true,
  component: {
    name: 'TextInput',
  },
  context: ['fieldIds'],
  validators: [{ name: 'uniqueId' }],
};
