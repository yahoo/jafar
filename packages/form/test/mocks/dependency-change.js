/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const model = {
  id: 'simple',
  fields: {
    country: {
      path: 'country',
    },
    city: {
      path: 'city',
      dependencies: ['country'],
      dependenciesChange: { name: 'cityDependenciesChange' },
    },
    address: {
      path: 'address',
      dependencies: ['city'],
      dependenciesChange: { name: 'addressDependenciesChange' },
    },
    countryCode: {
      path: 'countryCode',
      dependencies: ['country'],
      dependenciesChange: { name: 'countryCodeDependenciesChange' },
    },
  },
};

export const resources = {
  dependenciesChanges: {
    cityDependenciesChange: {
      func: (props) => (props.dependencies.country.value === 'Israel' ? { value: 'Tel Aviv' } : undefined),
    },
    addressDependenciesChange: {
      func: (props) => {
        if (props.dependencies.city.value === 'Tel Aviv') {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ value: 'Ben Yehuda' });
            }, 100);
          });
        }
        return undefined;
      },
    },
    countryCodeDependenciesChange: {
      func: (props) => (props.dependencies.country.value === 'Israel' ? { value: 'IL' } : undefined),
    },
  },
};

export default { model, resources };
