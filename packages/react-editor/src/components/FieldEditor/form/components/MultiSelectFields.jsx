/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import MultiSelect from '@jafar/react-components/edit/MultiSelect';

export default {
  renderer: MultiSelect,
  stateChange: ({ context }) => ({
    items: context.fieldIds.sort().map(fieldId => ({ label: fieldId, value: fieldId })),
  }),
};
