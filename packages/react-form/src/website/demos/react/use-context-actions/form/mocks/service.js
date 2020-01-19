const service = {
  fetchItems: query => new Promise((resolve) => {
    // mock server call
    setTimeout(() => {
      const allServerItems = [{
        value: 'BASKETBALL',
        label: 'Basketball',
      }, {
        value: 'FOOTBALL',
        label: 'Football',
      }, {
        value: 'SHOP',
        label: 'Shop',
      }, {
        value: 'FASHION',
        label: 'Fashion',
      }, {
        value: 'COOK',
        label: 'Cook',
      }];

      const items = allServerItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

      resolve(items);
    }, 1);
  }),
};

export default service;
