/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'User1',
//     // You will need to prepend the image path with your baseUrl
//     // if it is not '/', like: '/test-site/img/docusaurus.svg'.
//     image: '/img/docusaurus.svg',
//     infoLink: 'https://www.facebook.com',
//     pinned: true,
//   },
// ];

const FORM_DEMO_URL = `https://yahoo.github.io/jafar/react-form/index.html`;
const COMPONENTS_DEMO_URL = `https://yahoo.github.io/jafar/react-components/index.html`;
const LAYOUT_DEMO_URL = `https://yahoo.github.io/jafar/react-layout/index.html`;

const siteConfig = {
  title: 'Jafar',
  tagline: '!(Just another form application renderer)',
  url: 'https://yahoo.github.io/jafar',
  baseUrl: `${process.env.PUBLIC_URL || ''}/`,
  headerLinks: [
    { label: 'Docs', doc: 'introduction' },
    // { label: 'Help', page: 'help' },
    // { label: 'Blog', blog: true },
    { label: 'Form Demos', page: 'demo-react-form' },
    { label: 'Components Demos', page: 'demo-react-components' },
    { label: 'Layout Demos', page: 'demo-react-layout' },
    { label: 'GitHub', href: 'https://github.com/yahoo/jafar' },
  ],
  // urls to demos
  formDemoUrl: FORM_DEMO_URL,
  componentsDemoUrl: COMPONENTS_DEMO_URL,
  layoutDemoUrl: LAYOUT_DEMO_URL,
  // Used for publishing and more
  projectName: 'jafar',
  organizationName: 'Verizon Media',
  // If you have users set above, you add it here:
  // users,
  // path to images for header/footer
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',
  // Colors for website 
  colors: {
    primaryColor: '#F9970F',
    secondaryColor: '#8a8a8a',
  },
  docsSideNavCollapsible: true,
  // Custom fonts for website
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */
  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Verizon Media`,
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js', 
    `${process.env.PUBLIC_URL || ''}/js/update-href-urls.js`
  ],
  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: false, // true
  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  // Show documentation's last contributor's name.
  enableUpdateBy: false,
  // Show documentation's last update time.
  enableUpdateTime: false,
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/yahoo/jafar',
};

module.exports = siteConfig;
