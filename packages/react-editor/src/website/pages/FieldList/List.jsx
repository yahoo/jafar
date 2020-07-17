/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import List from '../List';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

export default () => (<List
  name="field" 
  label="Fields"
  columns={columns} 
  headerActions={headerActions()} 
  rowActions={rowActions()} 
/>);
