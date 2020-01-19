const allServerNamesMock = ['rachel', 'monica'];

export default {
  uniqueName: {
    func: (props) => !allServerNamesMock.includes((props.value || '').toLowerCase()), // can also be async
    message: props => `${props.label} should be unique`, // can also be async
  },
};
