export default {
  email: {
    label: "path 'email'",
    path: 'email',
    component: {
      name: 'inputText',
    },
    validators: [{
      name: 'email',
    }],
  },
  addressHome: {
    label: "path 'address.home'",
    path: 'address.home',
    component: {
      name: 'inputText',
    },
  },
  hobbies: {
    label: "path 'hobbies'",
    path: 'hobbies',
    component: {
      name: 'checkboxCollection',
      state: {
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
    },
  },
  hobbiesOne: {
    label: "path 'hobbies[1]'",
    path: 'hobbies[1]',
    component: {
      name: 'inputText',
    },
  },
  friendsZeroFirstName: {
    label: "path 'friends[0].firstName'",
    path: 'friends[0].firstName',
    component: {
      name: 'inputText',
    },
  },
};
