export default {
  firstName: {
    label: 'First Name',
    description: 'Enter first name',
    path: 'firstName',
    required: true,
    component: {
      name: 'inputText',
      state: {
        placeholder: 'First name',
      },
    },
  },
  lastName: {
    label: 'Last Name',
    description: 'Enter last name',
    path: 'lastName',
    required: true,
    component: {
      name: 'inputText',
      state: {
        placeholder: 'Last name',
      },
    },
  },
};
