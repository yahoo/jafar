/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const model = {
  id: 'state-changes',
  fields: {
    name: {
      path: 'name',
      component: {
        name: 'checkboxes',
        state: {
          search: {
            value: '',
          },
        },
      },
    },
  },
};

export const resources = {
  components: {
    checkboxes:{ 
      renderer: () => {},
      stateChange: (props) => {
        // if prevState isn't defined (i.e this is first call)
        if (!props.prevState || props.prevState.search.value !== props.state.search.value) {
          return {
            ...props.state,
            items: [],
            isLoading: true,
          };
        }
  
        // otherwise, if isLoading changes to true,
        // begin search and return promise which resolves an object of: { items: [ ... ], isLoading: false }
        if (props.state.isLoading) {
          return new Promise((resolve) => {
            // mock server call
            setTimeout(() => {
              const query = props.state.search.value;
              const serverItems = [{ label: 'Monica', value: 'MONICA' }, { label: 'Ross', value: 'ROSS' }];
              const items = serverItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
              resolve({
                ...props.state,
                items,
                isLoading: false,
              });
            }, 10);
          });
        }
  
        // no more changes needed
        return undefined;
      },
    },
  },
};

export default { model, resources };
