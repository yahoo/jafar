export default {
  first: {
    label: 'First',
    path: 'first',
    component: {
      name: 'inputText',
    },
    dependencies: ['second'],
    dependenciesChange: { name: 'firstDependenciesChange' },
  },
  second: {
    label: 'Second',
    path: 'second',
    component: {
      name: 'inputText',
    },
    dependencies: ['first'],
    dependenciesChange: { name: 'secondDependenciesChange' },
  },
};
