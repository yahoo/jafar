/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Layout',
  description: 'Select a layout that controls how the sections in the Item component will be rendered',
  path: 'item.layout',
  component: {
    name: 'Select',
    state: {
      items: [
        { label: 'Scroll', value: 'scroll' },
        { label: 'Tabs', value: 'tabs' },
        { label: 'Mobile', value: 'mobile' },
      ],
    },
  },
};
