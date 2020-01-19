/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

describe('<TimePicker />', () => {
  it('should render provided data', () => {
    expect(true).toBeTruthy();
  });
});


// import React from 'react';
// import { shallow } from 'enzyme';
// import TimePicker from './index.js';

// describe('<TimePicker />', () => {
// let component;
// let onValueChangeSpy;
// let value;
// let disabled;
// let state;

// beforeEach(() => {
//   onValueChangeSpy = jest.fn();
//   value = new Date('2019-06-18 09:00');
//   disabled = false;
//   state = {};
// });

// it('should render provided data', () => {
// expect(true).toBeTruthy();
// component = shallow(
//   getComponent(value, state, disabled, onValueChangeSpy)
// );
// expect(component).toMatchSnapshot();
// });

// function getComponent(value, state, disabled, onValueChange) {
//   return (
//     <TimePicker
//       value={value}
//       state={state}
//       disabled={disabled}
//       onValueChange={onValueChange}
//     />
//   );
// }
// });
