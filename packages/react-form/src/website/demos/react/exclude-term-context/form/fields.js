export default {
  resetPassword: {
    label: 'Reset Data Password',
    path: 'resetPassword',
    component: {
      name: 'inputText',
    },
    context: ['userType'],
    excludeTerm: {
      name: 'equals',
      args: { contextId: 'userType', value: 'ADMIN' },
      not: true,
    },
  },
};
