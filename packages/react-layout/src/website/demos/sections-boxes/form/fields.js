export default {
  id: {
    label: 'Id',
    path: 'id',
    component: {
      name: 'url',
    },
  },
  personalId: {
    label: 'Personal Id',
    path: 'personalId',
    component: {
      name: 'inputText',
    },
  },
  firstName: {
    label: 'First Name',
    description: 'Enter name',
    path: 'firstName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  lastName: {
    label: 'Last Name',
    description: 'Enter last name',
    path: 'lastName',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  address: {
    label: 'Address',
    description: 'Enter address',
    path: 'address',
    component: {
      name: 'inputText',
    },
    required: true,
  },
  department: {
    label: 'Department',
    path: 'department',
    component: {
      name: 'dropdown',
      state: {
        items: [{
          label: 'R&D',
          value: 'R&D',
        }, {
          label: 'Designers',
          value: 'DESIGNERS',
        }, {
          label: 'Product',
          value: 'PRODUCT',
        }, {
          label: 'HR',
          value: 'HR',
        }],
      },
    },
    required: true,
  },
  level: {
    label: 'Level',
    path: 'level',
    component: {
      name: 'dropdown',
      state: {
        items: [{
          label: 'Employee',
          value: 'EMPLOYEE',
        }, {
          label: 'Manager',
          value: 'MANAGER',
        }, {
          label: 'Top Manager',
          value: 'TOP_MANAGER',
        }],
      },
    },
    required: true,
  },
  benefits: {
    label: 'Benefits',
    path: 'benefits',
    component: {
      name: 'checkboxCollection',
      state: {
        items: [{
          value: 'CAR_RENTAL',
          label: 'Car Rental',
        }, {
          value: 'YEARLY_BONUS',
          label: 'Yearly Bonus',
        }, {
          value: 'MEDICAL_CARE',
          label: 'Medical Care',
        }, {
          value: 'MEALS_REFUND',
          label: 'Meals Refund',
        }, {
          value: 'FIRST_CLASS_FLIGHTS',
          label: 'First Class Flights',
        }],
      },
    },
  },
  modifier: {
    label: 'Modifier',
    path: 'modifier',
    component: {
      name: 'url',
    },
  },
  creationDate: {
    label: 'Creation Date',
    path: 'creationDate',
    component: {
      name: 'text',
    },
    dependencies: ['department'],
    excludeTerm: {
      name: 'equals',
      args: {
        fieldId: 'department',
        value: 'HR',
      },
    },
  },
  modificationDate: {
    label: 'Modification Date',
    path: 'modificationDate',
    component: {
      name: 'text',
    },
    dependencies: ['department'],
    excludeTerm: {
      name: 'equals',
      args: {
        fieldId: 'department',
        value: 'HR',
      },
    },
  },
};
