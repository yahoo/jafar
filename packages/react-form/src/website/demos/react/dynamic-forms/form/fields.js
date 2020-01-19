export default {
  name: {
    label: 'Company Name',
    path: 'name',
    component: {
      name: 'inputText',
    },
    description: 'Enter company name',
    required: true,
  },
  address: {
    label: 'Company Address',
    path: 'address',
    component: {
      name: 'inputText',
    },
  },
  employees: {
    label: 'Employees',
    path: 'employees',
    component: {
      name: 'employees',
    },
    required: true,
  },
};
