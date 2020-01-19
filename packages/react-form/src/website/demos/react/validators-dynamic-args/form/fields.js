export default {
  sites: {
    label: 'Sites',
    description: 'Enter sites you want the Ad be published on',
    path: 'sites',
    component: {
      name: 'CreatableMultiSelect',
    },
    validators: [{
      name: 'verifyPermittedSites',
    }],
  },
};
