/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Form id',
  description: 'Select a form to create layout for its fields',
  path: 'formId',
  required: true,
  component: {
    name: 'Select',
    state: {},
    stateChange: 'formIdStateChange',
  },
};
