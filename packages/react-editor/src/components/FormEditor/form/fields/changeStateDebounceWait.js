/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Change State Debounce Wait',
  description: 'Debounce changeState action for x milliseconds, to improve performance and reduce form lifecycles',
  path: 'settings.changeStateDebounceWait',
  component: {
    name: 'NumberInput',
    state: { placeholder: 'Default 250 ms' },
  },
  validators: [{ name: 'min', args: { value: 0 } }],
};
