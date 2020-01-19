export default {
  hobbiesDependenciesChange: {
    func: (props) => {
      if (props.prevDependencies && (props.dependencies.name.value !== props.prevDependencies.name.value)) {
        return {
          value: [],
          state: {
            ...props.state,
            search: {
              ...props.state.search,
              value: '',
            },
          },
        };
      }
      return undefined; // no changes needed
    },
  },
};
