/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['fbjs'],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,

  settings: {
    react: {
      version: 'detect',
    }
  },

  plugins: ['jest', 'no-for-of-loops', 'react', 'import', 'json', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },

  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    'accessor-pairs': OFF,
    'brace-style': [ERROR, '1tbs', { allowSingleLine: true }],
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': OFF,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'eol-last': ERROR,
    eqeqeq: [ERROR, 'allow-null'],
    indent: [ERROR, 2],
    'import/order': [ERROR, { 'newlines-between': 'never' }],
    'jsx-quotes': [ERROR, 'prefer-double'],
    'keyword-spacing': [ERROR, { after: true, before: true }],
    'no-bitwise': OFF,
    'no-inner-declarations': [ERROR, 'functions'],
    'no-multi-spaces': ERROR,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-shadow': OFF,
    'no-unused-expressions': [WARNING, { allowTernary: true, allowShortCircuit: true }],
    'no-unused-vars': [WARNING, { args: 'none' }],
    'no-use-before-define': [ERROR, { functions: false, variables: false }],
    'no-useless-concat': OFF,
    'object-curly-newline': ERROR,
    quotes: [ERROR, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'space-before-blocks': ERROR,
    'space-before-function-paren': OFF,
    'valid-typeof': [ERROR, { requireStringLiterals: true }],

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,
    strict: ERROR,

    // React & JSX
    // Our transforms set this automatically
    'react/jsx-boolean-value': [ERROR, 'always'],
    'react/jsx-no-undef': ERROR,
    // We don't care to do this
    'react/jsx-sort-prop-types': OFF,

    // The react/jsx-space-before-closing rule is deprecated. Please use the react/jsx-tag-spacing rule with the "beforeSelfClosing" option instead.
    // 'react/jsx-space-before-closing': ERROR,
    'react/jsx-tag-spacing': [ERROR, { beforeSelfClosing: 'always' }],

    'react/jsx-uses-react': ERROR,
    'react/no-is-mounted': OFF,
    // This isn't useful in our test code
    'react/react-in-jsx-scope': ERROR,
    'react/self-closing-comp': ERROR,
    // We don't care to do this
    'react/jsx-wrap-multilines': [ERROR, { declaration: false, assignment: false }],
    // Checks rules of Hooks
    "react-hooks/rules-of-hooks": ERROR,
    // Checks effect dependencies
    "react-hooks/exhaustive-deps": WARNING,
    // prettier
    // 'prettier/prettier': [ERROR, prettierConfig],
    // Prevent for...of loops because they require a Symbol polyfill.
    // You can disable this rule for code that isn't shipped (e.g. build scripts and tests).
    'no-for-of-loops/no-for-of-loops': ERROR,
    // Our own rules:
    'max-len': [WARNING, { code: 130 }],
    'no-console': WARNING,
    'import/no-webpack-loader-syntax': OFF,

    'object-curly-spacing': [ERROR, 'always'],
    'curly': [ERROR, 'multi-line', 'consistent'],
    'comma-spacing': [ERROR, { before: false, after: true }]

  },

  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*'],
      rules: {
        // https://github.com/jest-community/eslint-plugin-jest
        'jest/no-focused-tests': ERROR,
        "react/jsx-no-bind": [ERROR, {
          "ignoreDOMComponents": false,
          "ignoreRefs": false,
          "allowArrowFunctions": true,
          "allowFunctions": false,
          "allowBind": false
        }]
      },
    },
  ],

  globals: {
    spyOnDev: 'writable',
    spyOnDevAndProd: 'writable',
    spyOnProd: 'writable',
    __PROFILE__: 'writable',
    __UMD__: 'writable',
    flushAllPromises: 'writable',
    mount: 'writable',
    render: 'writable',
    shallow: 'writable',
  },
};
