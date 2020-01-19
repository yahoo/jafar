/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

module.exports = { 
  presets: [
    "@babel/preset-env"
  ],
  plugins: [
    "@babel/transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ]
 };