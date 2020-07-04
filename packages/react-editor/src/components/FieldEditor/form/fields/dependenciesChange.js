/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  label: 'Dependencies Change',
  description: 'Represent a name of a function that will be triggered when one of the fields dependencies value changes',
  path: 'dependenciesChange',
  component: {
    name: 'Handler',
    state: {
      options: [],
    },
  },
  validators: ['customNameRequired'],
  dependencies: ['dependencies'],
  excludeTerm: {
    name: 'empty',
    args: { fieldId: 'dependencies' },
  },
};
