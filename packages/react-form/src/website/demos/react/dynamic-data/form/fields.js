export default {
  id: {
    label: 'Id',
    path: 'id',
    component: {
      name: 'label',
    },
  },
  firstName: {
    label: 'First Name',
    path: 'firstName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  lastName: {
    label: 'Last Name',
    path: 'lastName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  address: {
    label: 'Address',
    path: 'address',
    component: {
      name: 'inputText',
    },
  },
};
