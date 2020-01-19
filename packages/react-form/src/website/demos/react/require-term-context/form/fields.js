export default {
  mergeReason: {
    label: 'Merge reason',
    path: 'mergeReason',
    component: {
      name: 'inputText',
    },
    context: ['userType'],
    requireTerm: {
      name: 'equals',
      args: { contextId: 'userType', value: 'ADMIN' },
      not: true,
    },
  },
};
