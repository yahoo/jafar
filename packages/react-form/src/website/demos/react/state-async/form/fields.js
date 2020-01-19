export default {
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
