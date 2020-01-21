const baseUrl = `${process.env.PUBLIC_URL || ''}/`;

const users = [
  {
    caption: 'Verizon Media',
    image: `${baseUrl}img/verizon-media.png`,
    infoLink: 'https://www.verizonmedia.com/',
    pinned: true,
  },
];

module.exports = users;