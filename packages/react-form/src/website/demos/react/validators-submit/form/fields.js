export default {
  email: {
    label: 'Email',
    description: 'Enter email',
    path: 'email',
    required: true,
    component: {
      name: 'inputText',
      state: {
        placeholder: 'Email',
      },
    },
    validators: [{
      name: 'email',
    }],
  },
  password: {
    label: 'Password',
    description: 'Enter password',
    path: 'password',
    required: true,
    component: {
      name: 'inputText',
      state: {
        placeholder: 'Password',
      },
    },
  },
};
