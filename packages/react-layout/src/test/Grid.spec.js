/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import Grid from '../components/Grid/index';

describe('Grid', () => {
  const Field = () => {};

  it('Should render grid', () => {
    const props = getGrid([
      'firstName lastName .',
      'personalId address .',
    ]);

    const component = shallow(<Grid {...props} />);
    expect(component).toMatchSnapshot();
  });

  function getGrid(templateAreas) {
    const fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
    return {
      templateAreas,
      elements: fieldIds.map(id => ({ 
        selector: `#${id}`, 
        gridArea: id, 
        component: Field, 
        props: { id },
        style: 'width: 350px;',
      })),
    };
  }
});
