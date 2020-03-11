/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import fields from './fields';
import components from './components';
import validators from './validators';
import conversions from './conversions';

export const model = {
  id: 'edit-field',
  fields,
};

export const resources = {
  components,
  validators,
  conversions,
};

export default { model, resources };
