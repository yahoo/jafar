export default {
  name: {
    label: 'Name',
    description: 'Enter user name',
    path: 'name',
    component: {
      name: 'inputText',
    },
    validators: [{
      name: 'uniqueName',
    }],
  },
};
