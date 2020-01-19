import React from 'react';
import Button from '@material-ui/core/Button';
import FormContext from '../../../../../components/context';

export default class ResetButton extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <Button aria-label="Reset" color="primary"
        disabled={this.context.model.invalid} onClick={this.reset}>{this.props.children}</Button>
    );
  }

  reset = () => {
    this.context.actions.reset();
  }
}
