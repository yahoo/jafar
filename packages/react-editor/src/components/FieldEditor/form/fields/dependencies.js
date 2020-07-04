/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Dependencies',
  description: 'Reflects the fields that this field depends on that will cause it to re-evaluate when their value changes',
  path: 'dependencies',
  context: ['fieldIds'],
  component: {
    name: 'MultiSelectFields',
    state: {
      searchable: true,
      items: [],
    },
  },
};
