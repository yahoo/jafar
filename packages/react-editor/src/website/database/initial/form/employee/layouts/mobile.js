export default {
  item: {
    title: 'Employee',
    layout: 'mobile',
    size: 1,
    sections: [{
      title: 'Personal Information',
      grid: [
        'firstName',
        'lastName',
        'personalId',
        'address',
      ],
    }, {
      title: 'Job Information',
      grid: [
        'department',
        'level',
        'benefits',
      ],
    }],
  },
};
