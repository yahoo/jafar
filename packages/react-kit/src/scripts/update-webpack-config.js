/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

/*
  Major hack
  changing the configFactory of react-scripts to implement our config changes.
  We do it by tapping into require.cache and wrapping the function provided by
  'react-scripts/config/webpack.config.js'.
*/
const webpack = require('webpack');
const _configFactory = require('react-scripts/config/webpack.config.js');
const REACT_CONTAINER_NAME = process.env.REACT_CONTAINER_NAME;

const updateWebpackConfig = function(config) {
  // Output
  config.output = Object.assign(config.output || {}, {
    library: REACT_CONTAINER_NAME,
    chunkFilename: 'static/js/[name].[contenthash].js',
  });

  // Optimization
  config.optimization = Object.assign(config.optimization || {}, {
    splitChunks: false,
    runtimeChunk: false,
    minimizer: !config.optimization.minimizer ? undefined : config.optimization.minimizer.filter(x =>
      x.constructor.name !== 'OptimizeCssAssetsWebpackPlugin'),
  });

  // Loaders (module)
  config.module.rules[1].use[0].options.useEslintrc = true;

  // Styled components' babel plugin - dev & stage only
  if (process.env.NODE_ENV !== 'production') {
    const babelLoader = config.module.rules[2].oneOf[1];
    babelLoader.options.plugins.push('babel-plugin-styled-components');
  }

  // Plugins
  config.plugins.push(
    new webpack.DefinePlugin({
      REACT_CONTAINER_NAME: JSON.stringify(REACT_CONTAINER_NAME),
    })
  );
};

const configFactory = function() {
  // create 'react-app' default webpack config
  const config = _configFactory.apply(this, arguments);
  
  // update default webpack config
  updateWebpackConfig(config);
  
  // return the updated config
  return config;
};

// override in require cache to contain the new config factory function
require.cache[require.resolve('react-scripts/config/webpack.config.js')].exports = configFactory;