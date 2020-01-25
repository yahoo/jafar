/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import InternalCheckboxCollection from './internal/CheckboxCollection';

/**
 * Represent an array of any type
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/edit/CheckboxCollection/CheckboxCollection.jsx">
 CheckboxCollection</a> from '@jafar-org/react-components/edit/CheckboxCollection'
 */
export default class CheckboxCollection extends React.Component {
  static propTypes = {
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

  static defaultProps = {
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

  render() {
    return (
      <InternalCheckboxCollection
        search={this.props.state.search}
        items={this.props.state.items}
        inline={this.props.state.inline}
        value={this.props.value}
        disabled={this.props.disabled}
        onChange={this.props.onValueChange}
        onSearchChange={this.onSearchChange}
      />
    );
  }

  onSearchChange = (value) => {
    this.props.onStateChange({ ...this.props.state, search: { ...this.props.state.search, value } });
  }
}
