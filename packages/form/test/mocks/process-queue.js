/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const model = {
  id: 'process-queue',
  data: {},
  fields: {
    name: {
      path: 'name',
      validators: [{
        name: 'uniqueName',
      }],
    },
  },
};

export const resources = {
  validators: {
    uniqueName: {
      func: (props) => { // only fails on Rachel
        // mock server names
        const serverNames = ['Rachel'];
        if (!serverNames.includes(props.value)) return true;

        // when value is Rachel - wait and return false
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 400); // wait more time than the debounce and change value cycle
        });
      },
      message: props => `The name: '${props.value}' is already taken`,
    },
  },
};

export default { model, resources };
