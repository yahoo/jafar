export default {
  name: 'Mobile - edit employee',
  item: {
    title: 'Employee',
    layout: 'mobile',
    size: 1,
    sections: [{
      id: 'personal-information',
      title: 'Personal Information',
      grid: {
        templateAreas: [
          'firstName',
          'lastName',
          'personalId',
          'address',
        ],
      },
    }, {
      id: 'job-information',
      title: 'Job Information',
      grid: {
        templateAreas: [
          'department',
          'level',
          'benefits',
        ],
      },
    }],
    mainActions: [
      { 
        label: 'Save', 
        disable: 'form is invalid', 
        onClick: 'save to db, send google analytics and return to list page', 
      },
    ],
    optionsActions: [
      { 
        label: 'Delete', 
        exclude: 'no DELETE permission', 
        onClick: 'delete from db, send google analytics and return to list page', 
      },
    ],
  },
};
