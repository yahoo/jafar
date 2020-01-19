export default {
  name: {
    label: 'Name',
    path: 'name',
    component: {
      name: 'inputText',
    },
  },
  welcomeMessage: {
    path: 'welcomeMessage',
    dependencies: ['name'],
    dependenciesChange: { name: 'welcomeMessageDependenciesChange' },
  },
};
