/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import components from './components';
import stateChanges from './state-changes';
import fields from './fields';
import { mainActionsForm } from './fields/mainActions';
import { optionsActionsForm } from './fields/optionsActions';
import { sectionsForm } from './fields/sections';

export const model = {
  id: 'edit-layout',
  fields,
};

export const resources = {
  components,
  stateChanges,
  mainActionsForm,
  optionsActionsForm,
  sectionsForm,
};

export default { model, resources };
