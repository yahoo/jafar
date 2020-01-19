const service = {
  fetchItems: (query) => {
    const allItems = [{
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

    const items = allItems.filter(x => x.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

    return items;
  },
};

export default service;
