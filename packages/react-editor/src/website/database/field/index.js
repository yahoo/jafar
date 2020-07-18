/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  id: {
    label: 'Entity Id',
    path: 'id',
    component: {
      name: 'Text',
    },
  },
  modifier: {
    label: 'Modifier',
    path: 'modifier',
    component: {
      name: 'Url',
    },
  },
  creationDate: {
    label: 'Creation Date',
    path: 'creationDate',
    component: {
      name: 'DateView',
    },
    dependencies: ['department'],
    excludeTerm: {
      name: 'equals',
      args: {
        fieldId: 'department',
        value: 'HR',
      },
    },
  },
  modificationDate: {
    label: 'Modification Date',
    path: 'modificationDate',
    component: {
      name: 'DateView',
    },
    dependencies: ['department'],
    excludeTerm: {
      name: 'equals',
      args: {
        fieldId: 'department',
        value: 'HR',
      },
    },
  },
};
