export default {
  item: {
    title: 'Employee',
    layout: 'scroll',
    size: 2,
    sections: [{
      title: 'Personal Information',
      grid: [
        'firstName   lastName   .',
        'personalId  address    .',
      ],
    }, {
      title: 'Job Information',
      grid: [
        'department  benefits   .',
        'level       benefits   .',
      ],
    }, {
      title: 'Metadata',
      grid: [
        'modifier  modificationDate   .',
        '.         creationDate       .',
      ],
    }],
  },
};
