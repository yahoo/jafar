/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Form from './Form';

export default function createForm({ model, resources, settings }) {
  return Inner => props => {
    const { context, data, ...customProps } = props;
    return (<Form model={model} resources={resources} settings={settings} context={context} data={data}>
      <Inner { ...customProps } />
    </Form>);
  };
}
