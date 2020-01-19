export default {
  age: {
    label: 'Age',
    path: 'age',
    component: {
      name: 'inputNumber',
    },
    formatter: { name: 'toNumber' },
    parser: { name: 'toString' },
  },
};
