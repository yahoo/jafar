/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { toJafar } from '../../utils';
import _CheckboxCollection from './internal/CheckboxCollection';

const propTypes = {
  value: PropTypes.array,
  state: PropTypes.shape({
    items: PropTypes.array,
    search: PropTypes.object,
    inline: PropTypes.bool,
  }),
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func,
};

const defaultProps = {
  value: [],
  state: {
    items: [],
    search: {
      value: '',
    },
    inline: false,
  },
  disabled: false,
};

export const mapper = ({ value, state, disabled, onValueChange, onStateChange }) => ({
  search: state.search,
  items: state.items,
  inline: state.inline,
  value,
  disabled,
  onChange: onValueChange,
  onSearchChange: value => onStateChange(({ state }) => ({ ...state, search: { ...state.search, value } })),
});

const CheckboxCollection = toJafar(_CheckboxCollection, mapper);

CheckboxCollection.propTypes = propTypes;
CheckboxCollection.defaultProps = defaultProps;

export default CheckboxCollection;

// hack for styleguidist (issue with hoc components)
/** @component */
/**
 * Represent a boolean value
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/CheckboxCollection">
 CheckboxCollection</a> from '@jafar/react-components/edit/CheckboxCollection'
 */
export const DemoCheckboxCollection = props => <CheckboxCollection {...props} />;
DemoCheckboxCollection.propTypes = propTypes;
DemoCheckboxCollection.defaultProps = defaultProps;
DemoCheckboxCollection.displayName = 'CheckboxCollection';
