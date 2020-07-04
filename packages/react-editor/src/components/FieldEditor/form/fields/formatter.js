/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import conversions from '@jafar/form/conversions';

export default {
  label: 'Formatter',
  description: 'Represent the formatter function that convert field\'s data value to component value',
  path: 'formatter',
  component: {
    name: 'Handler',
    state: {
      options: Object.keys(conversions),
      urlPrefix: 'https://yahoo.github.io/jafar/docs/formatter-parser#',
    },
  },
  validators: ['customNameRequired'],
  dependencies: ['component'],
  excludeTerm: {
    name: 'empty',
    args: { fieldId: 'component' },
  },
};
