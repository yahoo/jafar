/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

/**
 * Major hack
 *
 * We are changing the createJestConfig of react-scripts to implement our config changes.
 * We do it by tapping into require.cache and wrapping the function provided by react-scripts.
 */

process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');
const _configFactory = require('react-scripts/scripts/utils/createJestConfig');


const configFactory = function() {
  const config = _configFactory.apply(this, arguments);

  // test only suffix of 'e2e.js' files, and no need for coverage collect
  Object.assign(config, {
    collectCoverageFrom: [],
    testMatch: ['<rootDir>/src/**/*.e2e.js', '<rootDir>/test/**/*.e2e.js'],
  });

  const configHookPath = path.resolve(process.cwd(), 'jest-hook-e2e.js');
  if (fs.existsSync(configHookPath)) {
    const configHook = require(configHookPath);
    if (typeof configHook === 'function') {
      configHook(config);
    }
  }

  return config;
};

require.cache[require.resolve('react-scripts/scripts/utils/createJestConfig')].exports = configFactory;

module.exports = require('react-scripts/scripts/test');
