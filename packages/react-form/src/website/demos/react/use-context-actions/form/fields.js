export default {
  id: {
    label: 'Id',
    path: 'id',
    component: {
      name: 'label',
    },
    context: ['excludeId'],
    excludeTerm: {
      name: 'shouldExclude',
    },
  },
  name: {
    label: 'Name',
    description: 'Enter user name',
    path: 'name',
    component: {
      name: 'inputText',
    },
  },
  hobbies: {
    label: 'Hobbies',
    description: 'Select user hobbies',
    path: 'hobbies',
    component: {
      name: 'asyncCheckboxCollection',
      state: {
        search: {
          value: '',
        },
        items: [{
          value: 'BASKETBALL',
          label: 'Basketball',
        }, {
          value: 'FOOTBALL',
          label: 'Football',
        }, {
          value: 'SHOP',
          label: 'Shop',
        }, {
          value: 'FASHION',
          label: 'Fashion',
        }, {
          value: 'COOK',
          label: 'Cook',
        }],
      },
      stateChange: { name: 'hobbiesStateChange' },
    },
  },
};
