import React from 'react';
import Button from '@material-ui/core/Button';
import FormContext from '../../../../../components/context';

export default class SaveButton extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <Button aria-label="Save" color="primary" variant="contained"
        disabled={!this.context.model.dirty || this.context.model.invalid
        || this.context.model.processing} onClick={this.save}>{this.props.children}</Button>
    );
  }

  save = () => {
    this.props.onClick(this.context);
  }
}
