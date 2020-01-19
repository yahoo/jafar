export default {
  subject: {
    label: 'Subject',
    path: 'subject',
    component: {
      name: 'inputText',
    },
    dependencies: ['description'],
    validators: [{
      name: 'descriptionContainsSubject',
    }],
  },
  description: {
    label: 'Description',
    path: 'description',
    component: {
      name: 'inputText',
    },
    dependencies: ['subject'],
    requireTerm: {
      not: true,
      name: 'empty',
      args: { fieldId: 'subject' },
    },
    validators: [{
      name: 'descriptionContainsSubject',
    }],
  },
};
