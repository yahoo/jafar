export default {
  description: {
    label: 'Description',
    path: 'description',
    component: {
      name: 'InputText',
    },
  },
  shortDescription: {
    label: 'Short Description',
    path: 'shortDescription',
    component: {
      name: 'InputText',
    },
    dependencies: ['description'],
    requireTerm: {
      not: true,
      name: 'empty',
      args: { fieldId: 'description' },
    },
  },
};
