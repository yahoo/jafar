const baseUrl = `${process.env.PUBLIC_URL || ''}/`;

// Please add your logo in alphabetical order of caption.
const users = [
  {
    caption: 'Verizon Media',
    image: `${baseUrl}img/verizon-media.png`,
    infoLink: 'https://www.verizonmedia.com/',
    pinned: true,
  },
];

module.exports = users;