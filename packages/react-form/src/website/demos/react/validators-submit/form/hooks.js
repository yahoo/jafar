const serverEmailsMock = ['ross@friends.com', 'monica@friends.com'];

export default {
  validate: (props) => { // can also be async
    const isUnique = !serverEmailsMock.includes((props.data.email || '').toLowerCase());
    return isUnique ? undefined : {
      email: [{ name: 'unique', message: 'Email already taken' }],
    };
  },
  submit: (props) => { // can also be async
    console.log('Data is saved to the server', props.data); // eslint-disable-line
  },
};
