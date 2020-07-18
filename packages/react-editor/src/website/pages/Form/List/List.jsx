/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { downloadFormFiles } from '../../../../utils/download';
import List from '../../Base/List';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

export default () => (<List
  name="form" 
  label="Forms"
  columns={columns} 
  headerActions={headerActions()} 
  rowActions={rowActions({ downloadFormFiles })} 
/>);
