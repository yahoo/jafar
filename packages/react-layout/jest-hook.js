const mockRequire = '<rootDir>/__mocks__/jsMock.js'; // for e2e

module.exports = (config) => {
  config.collectCoverageFrom = config.collectCoverageFrom || [];
  config.testPathIgnorePatterns = config.testPathIgnorePatterns || [];
  config.testPathIgnorePatterns.push(...[
    '<rootDir>/src/website/',
    '<rootDir>/src/index.js',
    '<rootDir>/src/setupTests.js']);
  config.collectCoverageFrom.push(...[
      '!<rootDir>/src/website/**/**',
      '!<rootDir>/src/index.js',
      '!<rootDir>/src/setupTests.js']);
  config.coverageThreshold = config.coverageThreshold || {};
  config.coverageThreshold.global = {
    lines: 84,
    branches: 84,
    functions: 74,
    statements: 84,
  };
  config.moduleNameMapper = Object.assign(config.moduleNameMapper || {}, { // for the markups jsx
    '^.+/form/.+.js$': mockRequire,
  });
  config.snapshotSerializers = config.snapshotSerializers || [];
  if (config.snapshotSerializers.indexOf('enzyme-to-json/serializer') === -1) {
    config.snapshotSerializers.push('enzyme-to-json/serializer');
  }
  return config;
};