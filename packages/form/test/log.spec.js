/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import log from '../src/log';
import { setLogLevel, logLevels } from '../src/index';
import { createError, errors } from '../src/errors';

describe('Logger', () => {
  it('does not log when log level is none', () => {
    setLogLevel(logLevels.NONE);

    // debug
    const action = { type: 'START_PROCESSING' };
    let model = { id: 'friends' };
    const isUiChange = false;
    const orgDebug = global.console.debug;
    global.console.debug = jest.fn();
    log.debug('INIT', action, model, isUiChange);
    expect(global.console.debug).not.toHaveBeenCalled();
    global.console.debug = orgDebug;

    // warn
    const message = 'something is wrong with the left phalange';
    model = { id: 'friends' };
    const orgWarn = global.console.warn;
    global.console.warn = jest.fn();
    log.warn(message, model);
    expect(global.console.warn).not.toHaveBeenCalled();
    global.console.warn = orgWarn;

    // error
    const prefix = 'Jafar';
    const error = errors.MISSING_ID;
    const data = { hi: 'shalom' };
    const args = [];
    const subError = undefined;
    const orgError = global.console.error;
    global.console.error = jest.fn();
    log.error(createError(prefix, error, data, args, subError));
    expect(global.console.error).not.toHaveBeenCalled();
    global.console.error = orgError;
  });

  it('setLogLevel to invalid value', () => {
    expect(setLogLevel(logLevels.ERROR)).toEqual(logLevels.ERROR);

    const org = global.console.error;
    global.console.error = jest.fn();
    setLogLevel('bla');
    expect(global.console.error).toHaveBeenCalled();
    global.console.error = org;
  });

  it('debug logs ok', () => {
    setLogLevel(logLevels.DEBUG);
    const action = { type: 'START_PROCESSING' };
    const form = { model: { id: 'friends' }, resources: {} };
    const isUiChange = false;
    const orgDebug = global.console.debug;
    global.console.debug = jest.fn();
    log.debug('INIT', action, form, isUiChange);
    expect(global.console.debug).toHaveBeenCalledWith('\nJafar | friends | INIT | START_PROCESSING\n', 
      '', '\n action:', action, '\n form:  ', form, '\n\n');
    global.console.debug = orgDebug;
  });

  it('debug logs ok - with ui update', () => {
    setLogLevel(logLevels.DEBUG);
    const action = { type: 'SET_FIELD_COMPONENT_VALUE' };
    const form = { model: { id: 'friends' }, resources: {} };
    const isUiChange = true;
    const orgDebug = global.console.debug;
    global.console.debug = jest.fn();
    log.debug('INIT', action, form, isUiChange);
    expect(global.console.debug).toHaveBeenCalledWith('\nJafar | friends | INIT | SET_FIELD_COMPONENT_VALUE | %cUI updated\n', 
      'color:#ec44a8;', '\n action:', action, '\n form:  ', form, '\n\n');
    global.console.debug = orgDebug;
  });

  it('debug logs ok - with duration', () => {
    setLogLevel(logLevels.DEBUG);
    const action = { type: 'END_ACTION', duration: 23 };
    const form = { model: { id: 'friends' }, resources: {} };
    const isUiChange = false;
    const orgDebug = global.console.debug;
    global.console.debug = jest.fn();
    log.debug('INIT', action, form, isUiChange);
    expect(global.console.debug).toHaveBeenCalledWith('\nJafar | friends | INIT | END_ACTION | %c23 ms\n', 
      'color: #0095ff;', '\n action:', action, '\n form:  ', form, '\n\n');
    global.console.debug = orgDebug;
  });

  it('warn logs ok', () => {
    setLogLevel(logLevels.WARN);
    const message = 'something is wrong with the left phalange';
    const model = { id: 'friends' };
    const orgWarn = global.console.warn;
    global.console.warn = jest.fn();
    log.warn(message, model);
    expect(global.console.warn).toHaveBeenCalledWith(`Jafar warning - ${message}`, model);
    global.console.warn = orgWarn;
  });

  it('error logs ok', () => {
    setLogLevel(logLevels.ERROR);
    const prefix = 'Jafar';
    const error = errors.MISSING_ID;
    const data = { hi: 'shalom' };
    const args = [];
    const subError = undefined;
    const orgError = global.console.error;
    global.console.error = jest.fn();
    log.error(createError(prefix, error, data, args, subError));
    expect(global.console.error).toHaveBeenCalledWith(
      'Jafar error - "MISSING_ID": Jafar model.id is missing. More info: https://yahoo.github.io/jafar/docs/error-codes#missing-id.',
      '\ndata: ',
      data
);
    global.console.error = orgError;
  });
});
