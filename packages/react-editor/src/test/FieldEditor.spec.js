/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import FieldEditor from '../components/FieldEditor/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F9970D',
    },
    secondary: {
      main: '#879CA9',
    },
  },
});

describe('FieldEditor', () => {

  it('Should render component when props are defined - ok', () => {
    const box = {
      component: () => {},
      props: { 
        onCancel: () => {}, 
        onSave: () => {},
        formId: 'employee', 
        fieldId: 'firstName', 
        field: { path: 'firstName' }, 
        fieldIds: ['firstName', 'lastName', 'address'],
      },
    };
    const component = mount(getComponent(box));
    expect(component).toMatchSnapshot();
  });
 

  function getComponent(props) {
    return (<ThemeProvider theme={theme}><FieldEditor {...props} /></ThemeProvider>);
  }
});
