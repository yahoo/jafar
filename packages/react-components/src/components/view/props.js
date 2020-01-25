/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import PropTypes from 'prop-types';
import noop from 'lodash/noop';

export const propTypes = {
  value: PropTypes.any,
  state: PropTypes.object,
  onStateChange: PropTypes.func,
};

export const defaultProps = {
  value: undefined,
  state: {},
  onStateChange: noop,
};
