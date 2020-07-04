/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Change Value Debounce Wait',
  description: 'Debounce changeValue action for x milliseconds, to improve performance and reduce form lifecycles',
  path: 'settings.changeValueDebounceWait',
  component: {
    name: 'NumberInput',
    state: { placeholder: 'Default 250 ms' },
  },
  validators: [{ name: 'min', args: { value: 0 } }],
};
