import Service from './mocks/service';

export default {
  toDto: ({ data }) => ({ // to jafar data
    netflixContent: (data.content || []).filter(x => x.type === 'NETFLIX').map(x => x.name),
    hboContent: (data.content || []).filter(x => x.type === 'HBO').map(x => x.name),
  }),
  fromDto: ({ data }) => { // to app data (server data)
    const netflix = data.netflixContent.map(x => ({ name: x, type: 'NETFLIX' }));
    const hbo = data.hboContent.map(x => ({ name: x, type: 'HBO' }));
    return {
      content: [...netflix, ...hbo],
    };
  },
  submit: ({ data }) => { // app data / server data
    Service.saveToServer(data);
  },
};
