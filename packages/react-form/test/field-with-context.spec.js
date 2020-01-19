/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { withContext, FieldView } from '../src/components';

describe('field-with-context', () => {
  let Field;
  let context;

  beforeEach(() => {
    Field = withContext(FieldView);
    Field.contextTypes = {
      actions: PropTypes.object,
      model: PropTypes.object,
      resources: PropTypes.object,
    };

    context = {
      actions: {
        changeValue: jest.fn(),
        changeState: jest.fn(),
      },
      model: {
        fields: {
          firstName: {
            path: 'firstName',
            label: 'First Name',
            description: 'Enter first name',
            component: {
              name: 'InputText',
              value: 'Rachel',
            },
            invalid: false,
            errors: [],
          },
        },
      },
      resources: {
        components: {
          InputText: { renderer: jest.fn() },
        },
      },
    };
  });
  it('rendered correctly', () => {
    const element = new ShallowRenderer().render(<Field id="firstName" />, context);
    expect(element).toMatchSnapshot();
  });

  it('rendered correctly with unsupported jafar field props - pass it to the underline component', () => {
    const element = new ShallowRenderer().render(<Field id="firstName" mickey="mouse" />, context);
    expect(element).toMatchSnapshot();
  });

  it(`rendered correctly with reserved jafar field view prop - `
    + `dont pass it to the underline component, pass the jafar props`, () => {
    const element = new ShallowRenderer().render(<Field id="firstName" value="mouse" />, context);
    expect(element).toMatchSnapshot();
  });

  it(`rendered correctly with reserved jafar field view prop that is undefined - `
    + `dont pass it to the underline component, pass the jafar props`, () => {
    context.model.fields.firstName.component.value = undefined;
    const element = new ShallowRenderer().render(<Field id="firstName" value="mouse" />, context);
    expect(element).toMatchSnapshot();
  });

  it('onValueChange calls context.changeValue with correct args', () => {
    const element = new shallow(<Field id="firstName" />);
    element.instance().context = context;
    element.instance().onValueChange('firstName', 'new value');
    expect(context.actions.changeValue).toHaveBeenCalledWith('firstName', 'new value');
  });

  it('onStateChange calls context.changeState with correct args', () => {
    const element = new shallow(<Field id="firstName" />);
    element.instance().context = context;
    element.instance().onStateChange('firstName', { a: 'new value' });
    expect(context.actions.changeState).toHaveBeenCalledWith('firstName', { a: 'new value' });
  });
});
