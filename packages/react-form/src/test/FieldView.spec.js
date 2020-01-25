/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { FieldView } from '../components';

describe('FieldView', () => {
  const mockComponent = jest.fn();
  const mockOnValueChange = jest.fn();
  const mockOnStateChange = jest.fn();
  let props;
  let element;

  beforeEach(() => {
    props = {
      id: 'mockId',
      label: 'mockLabel',
      description: 'mockDescription',
      component: mockComponent,
      value: 'mockValue',
      state: {},
      excluded: false,
      disabled: false,
      required: true,
      invalid: false,
      dirty: false,
      empty: false,
      errors: [],
      onValueChange: mockOnValueChange,
      onStateChange: mockOnStateChange,
    };
  });

  describe('Proptypes', () => {
    it('component - valid when component is forwardRef object', () => {
      const component = React.forwardRef((props, ref) => React.createElement('div', { ref, ...props }));
      testComponentPropType(component);
    });

    it('component - valid when component is class component', () => {
      class myInput extends React.Component {
        render() { return (<div>{this.name}</div>); }
      }
      testComponentPropType(myInput);
    });

    it('component - valid when component is functional component', () => {
      const component = () => {};
      testComponentPropType(component);
    });

    function testComponentPropType(component, errorsNumber = 0) {
      const { error } = global.console;
      global.console.error = jest.fn();
      const fieldViewProps = Object.assign(props, { component });
      PropTypes.checkPropTypes(FieldView.propTypes, fieldViewProps, 'prop', 'fieldView');
      expect(global.console.error.mock.calls).toHaveLength(errorsNumber);
      global.console.error = error;
    }
  });

  it('rendered correctly', () => {
    element = shallow(<FieldView {...props} />);
    expect(element).toMatchSnapshot('default values');
  });

  it('not rendered if excluded is true', () => {
    props.excluded = true;
    element = shallow(<FieldView {...props} />);
    expect(element.type()).toEqual(null);
  });

  it('not rendered if no component', () => {
    props.component = undefined;
    element = shallow(<FieldView {...props} />);
    expect(element.type()).toEqual(null);
  });

  it('rendered correctly with invalid and required', () => {
    props.required = true;
    props.errors = [{ name: 'mockErrorMessage' }, { name: 'required' }];
    element = shallow(<FieldView {...props} />);
    expect(element).toMatchSnapshot('invalid field required');
  });

  it('rendered correctly with invalid not required', () => {
    props.invalid = true;
    props.errors = [{ name: 'mockErrorMessage' }];
    element = shallow(<FieldView {...props} />);
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot('invalid field not required');
  });

  it('rendered correctly with disabled', () => {
    props.disabled = true;
    element = shallow(<FieldView {...props} />);
    expect(element).toBeTruthy();
    expect(element).toMatchSnapshot('with disabled field');
  });

  it('onStateChange calls props.onStateChange', () => {
    element = shallow(<FieldView {...props} />);
    const mockState = { mockState: 'mockState' };
    element.instance().onStateChange(mockState);
    expect(mockOnStateChange).toHaveBeenCalledWith(props.id, mockState);
  });

  it('onValueChange calls props.onValueChange', () => {
    element = shallow(<FieldView {...props} />);
    const mockValue = 'mockValue';
    element.instance().onValueChange(mockValue);
    expect(mockOnValueChange).toHaveBeenCalledWith(props.id, mockValue);
  });

  it('shouldComponentUpdate returns false on when none of the conditions fulfilled', () => {
    element = shallow(<FieldView {...props} />);
    const shouldUpdate = element.instance().shouldComponentUpdate(props);
    expect(shouldUpdate).toBeFalsy();
  });

  it('rendered correctly with unsupported jafar field props - pass it to the underline component', () => {
    element = shallow(<FieldView mickey="mouse" {...props} />);
    expect(element).toMatchSnapshot('with unsupported prop');
  });

  it(`rendered correctly with reserved jafar field view props - `
    + `don't pass it to the underline component, pass the jafar props`, () => {
    element = shallow(<FieldView value="mouse" {...props} />);
    expect(element).toMatchSnapshot('with reserved prop');
  });
});
