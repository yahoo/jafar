/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isNil,
  isEqual,
  noop,
} from 'lodash';

export default {
  // during actions hooks
  validate: noop,
  submit: noop,
  toDto: ({ data }) => data,
  fromDto: ({ data }) => data,
  isEmpty: props => isNil(props.value)
      || isEqual(props.value, '')
      || isEqual(props.value, [])
      || isEqual(props.value, {}),
  emptyMessage: () => 'Field required',
  // before & after actions hooks
  beforeInit: noop,
  afterInit: noop,
  beforeDestroy: noop,
  afterDestroy: noop,
  beforeChangeValue: noop,
  afterChangeValue: noop,
  beforeChangeState: noop,
  afterChangeState: noop,
  beforeChangeUi: noop,
  afterChangeUi: noop,
  beforeChangeData: noop,
  afterChangeData: noop,
  beforeChangeContext: noop,
  afterChangeContext: noop,
  beforeSubmit: noop,
  afterSubmit: noop,
  beforeReset: noop,
  afterReset: noop,
  // cross actions hook
  beforeAction: noop,
  afterAction: noop,
  beforeDataChange: noop,
  afterDataChange: noop,
};
