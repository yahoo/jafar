/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */
 
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEqual, cloneDeep, noop } from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SearchInput from '../SearchInput';

const itemShape = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const searchShape = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default class CheckboxCollection extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.shape(itemShape)),
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    search: PropTypes.shape(searchShape),
    onChange: PropTypes.func,
    onSearchChange: PropTypes.func,
  };

  static defaultProps = {
    value: [],
    items: [],
    disabled: false,
    inline: false,
    search: undefined,
    onChange: noop,
    onSearchChange: noop,
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  onChange = (e, checked) => {
    const itemValue = e.target.value;
    const value = cloneDeep(this.props.value);
    if (checked) {
      value.push(itemValue);
    } else {
      value.splice(value.indexOf(itemValue), 1);
    }
    this.props.onChange(value);
  };

  onSearchChange = value => {
    this.props.onSearchChange(value);
  };

  render() {
    const Item = this.props.inline
      ? styled.div`
          display: inline-block;
        `
      : styled.div``;

    return (
      <React.Fragment>
        {this.props.search && (
          <SearchInput
            value={this.props.search.value}
            placeholder={this.props.search.placeholder}
            disabled={this.props.disabled}
            onChange={this.onSearchChange}
          />
        )}
        {this.props.items.map(item => {
          const checked = this.props.value.indexOf(item.value) > -1;
          return (
            <Item key={item.label}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.onChange}
                    value={item.value}
                    checked={checked}
                    disabled={this.props.disabled}
                  />
                }
                label={item.label}
              />
            </Item>
          );
        })}
      </React.Fragment>
    );
  }
}
