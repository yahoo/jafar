/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import DefaultButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export const types = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
};

const variantByButtonType = {
  [types.PRIMARY]: 'contained',
  [types.SECONDARY]: 'outlined',
  [types.TERTIARY]: undefined,
};
class Button extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(types)),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    component: PropTypes.elementType,
    disabled: PropTypes.bool,
  };

  render() {
    const { component: OuterComponent, ...otherProps } = this.props;
    const variant = variantByButtonType[this.props.type];
    return OuterComponent ? (<OuterComponent {...otherProps}>{this.props.label}</OuterComponent>) :
      (<DefaultButton 
        ref={this.props.elementRef}
        color="primary"
        variant={variant}
        button-type={this.props.type}
        disabled={this.props.disabled} 
        onClick={this.props.onClick}>{this.props.label}</DefaultButton>);
  }
}

export default Button;
