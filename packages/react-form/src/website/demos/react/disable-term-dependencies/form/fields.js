export default {
  contentType: {
    label: 'Content Type',
    path: 'contentType',
    component: {
      name: 'dropdown',
      state: {
        items: [{
          label: 'Series',
          value: 'SERIES',
        }, {
          label: 'Tv Show',
          value: 'TV_SHOW',
        }, {
          label: 'Movie',
          value: 'MOVIE',
        }],
      },
    },
  },
  seasonNumber: {
    label: 'Season Number',
    path: 'seasonNumber',
    component: {
      name: 'inputNumber',
      state: {
        min: 0,
      },
    },
    dependencies: ['contentType'],
    disableTerm: {
      name: 'equals',
      args: {
        fieldId: 'contentType',
        value: 'SERIES',
      },
      not: true,
    },
  },
  episodeNumber: {
    label: 'Episode Number',
    path: 'episodeNumber',
    component: {
      name: 'inputNumber',
      state: {
        min: 0,
      },
    },
    dependencies: ['contentType', 'seasonNumber'],
    disableTerm: {
      operator: 'or',
      terms: [{
        name: 'equals',
        args: {
          fieldId: 'contentType',
          value: 'SERIES',
        },
        not: true,
      }, {
        name: 'exists',
        args: {
          fieldId: 'seasonNumber',
        },
        not: true,
      }],
    },
  },
};
