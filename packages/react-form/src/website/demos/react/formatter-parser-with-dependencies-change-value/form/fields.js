import { countries, cities } from './mocks/service';

export default {
  country: {
    label: 'Country',
    path: 'country',
    component: {
      name: 'dropdown',
      state: {
        items: countries.map(x => ({ value: x.label, label: x.label })),
      },
    },
    formatter: { name: 'codeToLabel', args: { source: countries } },
    parser: { name: 'labelToCode', args: { source: countries } },
  },
  city: {
    label: 'City',
    path: 'city',
    component: {
      name: 'dropdown',
      state: {
        items: [],
      },
    },
    formatter: { name: 'codeToLabel', args: { source: cities } },
    parser: { name: 'labelToCode', args: { source: cities } },
    dependencies: ['country'],
    dependenciesChange: { name: 'cityDependenciesChange' },
    excludeTerm: {
      not: true,
      name: 'exists',
      args: {
        fieldId: 'country',
      },
    },
  },
};
