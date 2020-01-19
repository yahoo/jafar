import { countries, cities } from './mocks/service';

export default {
  cityDependenciesChange: {
    func: (props) => {
      // get capital city of the country
      if (!props.prevDependencies || (props.dependencies.country.value !== props.prevDependencies.country.value)) {
        return {
          state: {
            items: props.dependencies.country.value
              ? cities
                .filter(x => x.countryCode === countries.find(country => country.code === props.dependencies.country.value).code)
                .map(x => ({ value: x.label, label: x.label }))
              : undefined,
          },
          value: props.dependencies.country.value
            ? cities.find(x => (x.countryCode === props.dependencies.country.value) && x.capital).code
            : undefined,
        };
      }
      return undefined;
    },
  },
};
