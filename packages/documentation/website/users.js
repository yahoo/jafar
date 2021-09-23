const baseUrl = `${process.env.PUBLIC_URL || ''}/`;

// Please add your logo in alphabetical order of caption.
const users = [
  {
    caption: 'Yahoo Inc.',
    image: `${baseUrl}img/yahoo.png`,
    infoLink: 'https://www.yahooinc.com/',
    pinned: true,
  },
];

module.exports = users;
