/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Actions } from './types';
import init from './init';
import changeValue from './change-value';
import changeState from './change-state';
import changeUi from './change-ui';
import destroy from './destroy';
import changeData from './change-data';
import changeContext from './change-context';
import submit from './submit';
import reset from './reset';

export {
  init,
  destroy,
  changeData,
  changeValue,
  changeState,
  changeContext,
  changeUi,
  submit,
  reset,
};

export default {
  [Actions.INIT]: init,
  [Actions.DESTROY]: destroy,
  [Actions.CHANGE_DATA]: changeData,
  [Actions.CHANGE_VALUE]: changeValue,
  [Actions.CHANGE_STATE]: changeState,
  [Actions.CHANGE_CONTEXT]: changeContext,
  [Actions.CHANGE_UI]: changeUi,
  [Actions.SUBMIT]: submit,
  [Actions.RESET]: reset,
};
