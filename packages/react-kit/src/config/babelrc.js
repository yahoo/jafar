/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

module.exports = { 
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "import-rename",
      {
        "^(.*)\\.jsx$": "$1"
      }
    ],
    [
      "@babel/transform-runtime",
      {
        "helpers": false,
        "regenerator": true
      }
    ]
  ]
 };