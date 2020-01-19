/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

'use strict';
const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ['airbnb-base'],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,

  plugins: ['no-for-of-loops', 'import', 'json'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [".js"]
      }
    }
  },
  overrides: [{
    files: [
      "**/*.spec.js"
    ],
    env: {
      jest: true // now **/*.spec.js files' env has both es6 *and* jest
    },
    // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
    // "extends": ["plugin:jest/recommended"]
    plugins: ["jest"],
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
  }],

  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs', {
      allowSingleLine: true
    }],
    'comma-dangle': [ERROR, 'always-multiline'], // this rule covered by prettier -> trailingComma: 'es5'
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    indent: OFF,
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-webpack-loader-syntax': OFF,
    'import/order': [ERROR, {
      'newlines-between': 'never'
    }],
    // 'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, {
      after: true,
      before: true
    }],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': OFF,
    'no-unused-expressions': [ERROR, {
      allowTernary: true,
      allowShortCircuit: true
    }],
    'no-unused-vars': [ERROR, {
      args: 'none'
    }],
    'no-use-before-define': [ERROR, {
      functions: false,
      variables: false
    }],
    'no-useless-concat': OFF,
    'object-curly-newline': ERROR,
    quotes: [ERROR, 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'space-before-blocks': ERROR,
    'valid-typeof': [ERROR, {
      requireStringLiterals: true
    }],

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,
    strict: ERROR,

    // Prevent for...of loops because they require a Symbol polyfill.
    // You can disable this rule for code that isn't shipped (e.g. build scripts and tests).
    'no-for-of-loops/no-for-of-loops': ERROR,
    // Our own rules:
    'max-len': [ERROR, {
      code: 130
    }],
    'no-console': ERROR,
    'no-param-reassign': OFF
  },

  globals: {
    spyOnDev: true,
    spyOnDevAndProd: true,
    spyOnProd: true,
    __PROFILE__: true,
    __UMD__: true,
  },
};