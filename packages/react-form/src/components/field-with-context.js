/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { mapFieldToProps } from '@jafar-org/form';
import FormContext from './context';

const propTypes = {
  id: PropTypes.string.isRequired,
};

export default function withContext(FieldView) {
  class Field extends React.Component {
    static contextType = FormContext;

    static propTypes = propTypes;

    render() {
      const fieldViewProps = mapFieldToProps(this.props.id, this.context.model, this.context.resources);

      return (
        <FieldView
          {...this.props} // custom props to propagate
          {...fieldViewProps}
          onValueChange={this.onValueChange}
          onStateChange={this.onStateChange}
        />
      );
    }

    // We don't pass 'changeValue' and 'changeState' directly to FieldView prop because context 
    // create a new instance of them each render causing un-necessary renders to FieldView
    onValueChange = (id, value) => {
      this.context.actions.changeValue(id, value);
    }

    onStateChange = (id, state) => {
      this.context.actions.changeState(id, state);
    }
  }

  return Field;
}
