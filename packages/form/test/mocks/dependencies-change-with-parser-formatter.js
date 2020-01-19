/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const countries = [
  { code: 'IL', label: 'Israel' },
];

const cities = [
  { code: 'TLV', label: 'Tel Aviv', countryCode: 'IL' },
  {
    code: 'JRM', label: 'Jerusalem', countryCode: 'IL', capital: true,
  },
];

export const model = {
  id: 'simple',
  fields: {
    country: {
      path: 'country',
      component: {
        name: 'mockComponent',
      },
      parser: { name: 'labelToCode', args: { source: countries } },
      formatter: { name: 'codeToLabel', args: { source: countries } },
    },
    city: {
      path: 'city',
      component: {
        name: 'mockComponent',
      },
      parser: { name: 'labelToCode', args: { source: cities } },
      formatter: { name: 'codeToLabel', args: { source: cities } },
      dependencies: ['country'],
      dependenciesChange: { name: 'cityDependenciesChange' },
    },
  },
};

export const resources = {
  components: {
    mockComponent: { renderer: () => {} },
  },
  conversions: {
    labelToCode: { func: props => (props.value ? props.args.source.find(x => x.label === props.value).code : undefined) },
    codeToLabel: { func: props => (props.value ? props.args.source.find(x => x.code === props.value).label : undefined) },
  },
  dependenciesChanges: {
    cityDependenciesChange: {
      func: (props) => {
        // get capital city of the country
        if (props.prevDependencies && (props.dependencies.country.value !== props.prevDependencies.country.value)) {
          return {
            value: cities.find(x => (x.countryCode === props.dependencies.country.value) && x.capital).code,
          };
        }
        return undefined;
      },
    },
  },
};

export default { model, resources };
