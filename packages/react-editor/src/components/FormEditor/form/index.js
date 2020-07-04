/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import components from './components';
import validators from './validators';
import fields from './fields';

export const model = {
  id: 'edit-form',
  fields,
};

export const resources = {
  components,
  validators,
};

export default { model, resources };
