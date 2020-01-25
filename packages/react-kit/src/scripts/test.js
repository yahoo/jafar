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

  // match and collect coverage from root/src/test folder
  config.testMatch.push('<rootDir>/src/test/**/*.{spec,test}.{js,jsx}');
  config.collectCoverageFrom.push('src/**/*.{js,jsx}');
  config.collectCoverageFrom.push('!src/test/**/*.{js,jsx}');

  // .e2e.js files should not be in coverage report
  config.collectCoverageFrom.push('!<rootDir>/src/**/*.e2e.js');

  // run jest hook - each package can also update the jest config
  // for example - to update the threshold coverage
  const configHookPath = path.resolve(process.cwd(), 'jest-hook.js');
  if (fs.existsSync(configHookPath)) {
    const configHook = require(configHookPath);
    if (typeof configHook === 'function') {
      configHook(config);
    }
  }

  // return config
  return config;
};

require.cache[require.resolve('react-scripts/scripts/utils/createJestConfig')].exports = configFactory;

module.exports = require('react-scripts/scripts/test');
