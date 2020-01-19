export default {
  welcomeMessageDependenciesChange: {
    func: props => ({ value: `Hello ${(props.dependencies.name.value || 'stranger').toLowerCase()}, welcome!` }),
  },
};
