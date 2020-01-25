/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import PropTypes from 'prop-types';
import noop from 'lodash/noop';

export const propTypes = {
  value: PropTypes.any,
  state: PropTypes.object,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func,
};

export const defaultProps = {
  value: undefined,
  state: {},
  disabled: false,
  invalid: false,
  required: false,
  onValueChange: noop,
  onStateChange: noop,
};
