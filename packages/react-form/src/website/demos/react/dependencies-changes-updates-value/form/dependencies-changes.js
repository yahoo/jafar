export default {
  lastNameDependenciesChange: {
    func: (props) => { // can also be async
      if (props.prevDependencies && (props.dependencies.name.value !== props.prevDependencies.name.value)) {
        return {
          value: (props.dependencies.name.value || '').toUpperCase(),
        };
      }
      return undefined; // no changes needed
    },
  },
};
