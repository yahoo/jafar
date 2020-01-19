const path = require('path');
const configFactory = require('react-scripts/config/webpack.config');

module.exports = {
  template: {
    favicon: 'src/favicon.ico',
  },
  skipComponentsWithoutExample: true,
  title: 'Jafar React Components',
  require: [
    path.resolve(__dirname, 'styleguide.setup.js'),
    path.join(__dirname, 'styleguide.overrides.css'),
  ],
  theme: {
    sidebarWidth: 250,
    color: {
      base: '#555555',
      border: '#eaeaea',
      link: '#f9970f',
      linkHover: '#f9970f',
    },
  },
  sections: [{
    name: 'Edit Components',
    components: 'src/edit/**/[A-Z]*.jsx',
    ignore: '**/internal/**/*',
  }, {
    name: 'View Components',
    components: 'src/view/**/[A-Z]*.jsx',
    ignore: '**/internal/**/*',
  }],
  webpackConfig: configFactory('development'),
};
