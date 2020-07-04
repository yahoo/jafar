/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import conversions from '@jafar/form/conversions';

export default {
  label: 'Parser',
  description: 'Represent the parser function that convert field\'s component value to data value',
  path: 'parser',
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
