/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// update webpack config
require('./update-webpack-config.js');

module.exports = require('react-scripts/scripts/build');
