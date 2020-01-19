export default {
  name: {
    label: 'Name',
    path: 'name',
    component: {
      name: 'inputText',
    },
  },
  hobbies: {
    label: 'Hobbies',
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
    dependencies: ['name'],
    dependenciesChange: { name: 'hobbiesDependenciesChange' },
  },
};
