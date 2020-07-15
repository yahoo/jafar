/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Size',
  description: 'Layout size: 1 | 2 | 3 | 4',
  path: 'item.size',
  component: {
    name: 'NumberInput',
  },
  validators: [{ name: 'min', args: { value: 1 } }],
};
