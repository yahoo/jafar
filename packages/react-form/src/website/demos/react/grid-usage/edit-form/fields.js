export default {
  id: {
    path: 'id',
    component: {
      name: 'label',
    },
  },
  firstName: {
    path: 'firstName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  lastName: {
    path: 'lastName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  facebook: {
    path: 'facebook',
    component: {
      name: 'inputUrl',
    },
    validators: [{
      name: 'url',
    }],
  },
  address: {
    path: 'address',
    component: {
      name: 'inputText',
    },
  },
};
