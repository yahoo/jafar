import React from 'react';
import ReactJson from 'react-json-view';
import FormContext from '../../../../../components/context';

export default class DataView extends React.Component {
  static contextType = FormContext;

  render() {
    return (
      <ReactJson src={this.context.model.data} name="data" displayDataTypes={false} enableClipboard={false} />
    );
  }
}
