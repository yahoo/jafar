/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Id',
  description: 'Unique form id',
  path: 'model.id',
  component: {
    name: 'TextInput',
  },
  required: true,
  context: ['formIds'],
  validators: [{ name: 'uniqueId' }],
};
