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
        'modifier      modificationDate   .',
        'creationDate  .                  .',
      ],
    }],
    mainActions: [
      { label: 'Save', type: 'primary', disable: 'form is invalid', onClick: 'save to db, send google analytics and return to list page' },
      { label: 'Cancel', type: 'tertiary', onClick: 'return to list page' },
    ],
    optionsActions: [
      { label: 'History', onClick: 'show employee history' },
      { label: 'Work Hours', onClick: 'show employee working hours for the past month' },
      { label: 'Delete', exclude: 'no DELETE permission', onClick: 'delete from db, send google analytics and return to list page' },
    ],
  },
};
