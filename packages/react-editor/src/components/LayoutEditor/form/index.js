/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import components from './components';
import stateChanges from './state-changes';
import fields from './fields';

export const model = {
  id: 'edit-layout',
  fields,
};

export const resources = {
  components,
  stateChanges,
};

export default { model, resources };