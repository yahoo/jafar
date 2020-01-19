const { defaultsDeep } = require('lodash');
const base = require('../../jest.config.js');

module.exports = defaultsDeep({
  coverageThreshold: {
    global: {
      lines: 16,
      branches: 13,
      functions: 24,
      statements: 15,
    },
  },
}, base);
