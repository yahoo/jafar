/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import FieldView from '../../../../components/FieldView';

// Note you can also override the entire render function instead of getHeader / getBody / getFooter
export default class CustomFieldView extends FieldView {
  getHeader() {
    const Header = this.props.label ? <div className="field-label"><span>🌴</span>{this.props.label}</div> : null;
    return (Header);
  }

  getFooter() {
    const errors = this.props.errors.map(error => (<div key={error.name} className="field-error">
      <span>😡</span>{error.message}</div>));

    return (<div>
      {this.props.description ? <div className="field-description"><span>☝</span>{this.props.description}</div> : undefined}
      {errors}
    </div>);
  }
}
