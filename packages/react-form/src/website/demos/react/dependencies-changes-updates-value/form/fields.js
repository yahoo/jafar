export default {
  name: {
    label: 'Name',
    path: 'name',
    component: {
      name: 'inputText',
    },
  },
  lastName: {
    label: 'Last Name',
    path: 'lastName',
    component: {
      name: 'inputText',
    },
    dependencies: ['name'],
    dependenciesChange: { name: 'lastNameDependenciesChange' },
  },
};
