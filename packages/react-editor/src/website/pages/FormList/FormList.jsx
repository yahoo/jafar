/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { downloadFormFiles } from '../../../utils/download';
import List from '../List';
import columns from './columns';
import rowActions from './row-actions';
import headerActions from './header-actions';

const FormList = ({ history }) => (<List
  history={history} 
  name="form" 
  label="Forms"
  columns={columns} 
  headerActions={headerActions()} 
  rowActions={rowActions({ downloadFormFiles })} 
/>);

export default FormList;
