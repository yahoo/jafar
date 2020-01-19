export default {
  id: {
    label: 'Id',
    path: 'id',
    component: {
      name: 'label',
    },
  },
  name: {
    label: 'Name',
    description: 'Enter user name',
    path: 'name',
    component: {
      name: 'inputText',
    },
  },
  hobbies: {
    label: 'Hobbies',
    description: 'Select user hobbies',
    path: 'hobbies',
    component: {
      name: 'asyncCheckboxCollection',
      state: {
        search: {
          value: '',
          placeholder: 'Search',
        },
        items: [],
      },
      stateChange: { name: 'hobbiesStateChange' },
    },
  },
};
