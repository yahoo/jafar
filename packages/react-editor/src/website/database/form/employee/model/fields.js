/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  id: {
    label: 'Id',
    path: 'id',
    component: {
      name: 'Text',
    },
  },
  personalId: {
    label: 'Personal Id',
    description: 'Personal id number as appears in your ID',
    path: 'personalId',
    component: {
      name: 'InputNumber',
    },
    required: true,
  },
  firstName: {
    label: 'First Name',
    description: 'First name as appears in your ID',
    path: 'firstName',
    component: {
      name: 'TextInput',
    },
    required: true,
  },
  lastName: {
    label: 'Last Name',
    description: 'Last name as appears in your ID',
    path: 'lastName',
    component: {
      name: 'TextInput',
    },
    required: true,
  },
  address: {
    label: 'Address',
    description: 'Home address as appears in your ID',
    path: 'address',
    component: {
      name: 'TextInput',
    },
    required: true,
  },
  department: {
    label: 'Department',
    path: 'department',
    component: {
      name: 'Dropdown',
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
      name: 'Dropdown',
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
      name: 'CheckboxCollection',
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
    validators: [{
      name: 'minLength',
      args: { value: 3 },
    }],
  },
  modifier: {
    label: 'Modifier',
    path: 'modifier',
    component: {
      name: 'Url',
    },
  },
  creationDate: {
    label: 'Creation Date',
    path: 'creationDate',
    component: {
      name: 'DateView',
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
      name: 'DateView',
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
