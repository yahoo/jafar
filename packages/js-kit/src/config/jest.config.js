/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/*/dist',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!*.spec.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/mocks/**',
  ],
  coverageThreshold: {
    global: {
      lines: 95,
      branches: 95,
      functions: 95,
      statements: 95,
    },
  },
};
