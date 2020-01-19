/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const model = {
  id: 'syncValidator',
  data: {},
  fields: {
    name: {
      label: 'Name',
      path: 'name',
      validators: [{
        name: 'uniqueName',
      }],
    },
    lastName: {
      label: 'Last Name',
      path: 'lastName',
    },
  },
};

export const resources = {
  validators: {
    uniqueName: {
      func: (props) => {
        const isNameUnique = !['gal', 'asaf'].includes((props.value || '').toLowerCase());
        return isNameUnique;
      },
      message: props => `${props.label} should be unique`,
    },
  },
};

export default { model, resources };
