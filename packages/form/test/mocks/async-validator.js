/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const model = {
  id: 'asyncValidator',
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
      func: props => new Promise((resolve) => {
          // some async / call to server
          setTimeout(() => {
            const isNameUnique = ['gal', 'asaf'].indexOf((props.value || '').toLowerCase()) === -1;
            resolve(isNameUnique);
          }, 10);
        }),
      message: props => `${props.label} should be unique`,
    },
  },
};

export default { model, resources };
