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
    mainActions: [
      { label: 'Save', disable: 'form is invalid', onClick: 'save to db, send google analytics and return to list page' },
    ],
    optionsActions: [
      { label: 'Delete', exclude: 'no DELETE permission', onClick: 'delete from db, send google analytics and return to list page' },
    ],
  },
};
