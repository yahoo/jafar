export default {
  firstDependenciesChange: {
    func: props => ({ value: `${props.value}a` }),
  },
  secondDependenciesChange: {
    func: props => ({ value: `${props.value}b` }),
  },
};
