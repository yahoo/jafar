/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { propTypes, defaultProps } from '../props';
import InternalCheckboxCollection from './internal/CheckboxCollection';

export default class CheckboxCollection extends React.Component {
  static propTypes = Object.assign({}, propTypes, {
    value: PropTypes.array,
  })

  static defaultProps = Object.assign({}, defaultProps, {
    value: [],
    state: {
      items: [],
      search: undefined,
    },
  })

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
