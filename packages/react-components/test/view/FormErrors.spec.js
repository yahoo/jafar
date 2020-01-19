/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import FormErrors from '../../src/view/FormErrors';

describe('<FormErrors />', () => {
  let component;
  let context;

  beforeEach(() => {
    FormErrors.contextTypes = {
      model: PropTypes.object,
    };
    context = {
      model: { 
        fields: {
          firstName: {
            label: 'First Name',
            errors: [{
              name: 'required',
              message: 'Field Required',
            }],
          },
        },
        invalid: true,
      },
    };
    jest.spyOn(React, 'useContext').mockImplementation(() => context);
    component = shallow(getComponent());
  });
  it('should render provided data', () => {
    expect(component).toMatchSnapshot();
  });

  function getComponent() {
    return (<FormErrors onClickField={() => {}} />);
  }
});
