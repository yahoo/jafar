/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  uniqueId: {
    func: ({ value, context }) => {
      return !context.fieldIds.includes(value);
    },
    message: () => 'Id already exists for this form',
  },
  customNameRequired: {
    func: ({ value = {} }) => {
      return !!value.name;
    },
    message: () => 'Missing custom name',
  },
  validatorsNamesRequired: {
    func: ({ value = [] }) => {
      return !value.find(v => !v.name);
    },
    message: () => 'All validators should define a name',
  },
};
