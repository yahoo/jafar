/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, noop } from 'lodash';
import Styled from './StyledComponents';

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
  value: PropTypes.any,
  state: PropTypes.object,
  excluded: PropTypes.bool,
  disabled: PropTypes.bool,
  dirty: PropTypes.bool,
  required: PropTypes.bool,
  empty: PropTypes.bool,
  invalid: PropTypes.bool,
  errors: PropTypes.array,
  onValueChange: PropTypes.func,
  onStateChange: PropTypes.func,
};

export default class FieldView extends React.Component {
  static propTypes = propTypes;

  static defaultProps = {
    id: undefined,
    label: '',
    description: '',
    component: undefined,
    value: undefined,
    state: {},
    excluded: false,
    disabled: false,
    dirty: false,
    required: false,
    empty: false,
    invalid: false,
    errors: [],
    onValueChange: noop,
    onStateChange: noop,
  };

  constructor(props) {
    super(props);

    this.style = {
      labelColor: '#989697',
      asteriskColor: '#989697',
      errorColor: '#3a3a3a',
      invalidColor: '#e04336',
      disabledColor: '#cccccc',
      margin: '0 40px 40px 0',
    };
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const exclude = !this.props.component || this.props.excluded;
    if (exclude) {
      return null;
    }

    this.modeColor = getModeColor(this.props.invalid, this.props.disabled, this.style);

    return (
      <Styled.Field component={this.props.component.name} id={this.props.id} margin={this.style.margin}>
        {this.getHeader()}
        {this.getBody()}
        {this.getFooter()}
      </Styled.Field>
    );
  }

  getHeader() {
    if (!this.props.label) {
      return null;
    }

    const asteriskColor = this.modeColor || this.style.asteriskColor;
    const labelColor = this.modeColor || this.style.labelColor;

    return (
      <Styled.Header>
        <Styled.Label color={labelColor}>{this.props.label}</Styled.Label>
        {this.props.required && (<Styled.RequiredAsterisk color={asteriskColor}>*</Styled.RequiredAsterisk>)}
        {this.props.description && (<Styled.Description title={this.props.description}>?</Styled.Description>)}
      </Styled.Header>
    );
  }

  getBody() {
    const GenericComponent = this.props.component;

    return (
      <div aria-label="Field Component">
        <GenericComponent
          {...getDynamicProps(this.props)}
          value={this.props.value}
          state={this.props.state}
          onValueChange={this.onValueChange}
          onStateChange={this.onStateChange}
          disabled={this.props.disabled}
          dirty={this.props.dirty}
          required={this.props.required}
          empty={this.props.empty}
          invalid={this.props.invalid}
        />
      </div>
    );
  }

  getFooter() {
    return !this.props.errors.length ? undefined :
      (<Styled.Error color={this.modeColor || this.style.errorColor}>{this.props.errors[0].message}</Styled.Error>);
  }

  onValueChange = (value) => {
    this.props.onValueChange(this.props.id, value);
  };

  onStateChange = (state) => {
    this.props.onStateChange(this.props.id, state);
  };
}

function getModeColor(invalid, disabled, style) {
  if (disabled) { return style.disabledColor; }
  if (invalid) { return style.invalidColor; }
  return undefined;
}

function getDynamicProps(props) {
  const dynamicProps = Object.assign({}, props);
  Object.keys(propTypes).forEach((prop) => {
    delete dynamicProps[prop];
  });
  return dynamicProps;
}
