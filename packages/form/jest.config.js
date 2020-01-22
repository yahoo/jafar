const { defaultsDeep } = require('lodash');
const base = require('@jafar-org/js-kit/config/jest.config.js');

module.exports = defaultsDeep({
  coverageThreshold: {
    global: {
      lines: 99.8,
      branches: 95.18,
      functions: 99.7,
      statements: 99.8,
    },
  },
}, base);
