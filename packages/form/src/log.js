/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { createError, errors } from './errors';

export const logLevels = {
  DEBUG: 'debug',
  WARN: 'warn',
  ERROR: 'error',
  NONE: 'none',
};

const logLevelsValue = {
  debug: 3,
  warn: 2,
  error: 1,
  none: 0,
};

const ERROR_PREFIX = 'Form log -';

export const DEFAULT_LOG_LEVEL = process.env.NODE_ENV === 'development' ? logLevels.DEBUG : logLevels.ERROR;

let logLevel = DEFAULT_LOG_LEVEL;

const debug = (actionType, action, form, isUiChange) => {
  if (!shouldLog(logLevels.DEBUG)) return;
  const formId = form && form.model ? form.model.id : action.formId;
  const duration = action.duration === undefined ? '' : ` | %c${action.duration} ms`;
  const uiUpdated = isUiChange ? ' | %cUI updated' : '';
  const title = `\nJafar | ${formId} | ${actionType} | ${action.type}${duration}${uiUpdated}\n`;
  let css = '';
  if (isUiChange || duration) {
    css = isUiChange ? 'color:#ec44a8;' : 'color: #0095ff;';
  }
  console.debug(title, css, '\n action:', action, '\n form:  ', form, '\n\n'); // eslint-disable-line
};

const warn = (message, data) => {
  if (!shouldLog(logLevels.WARN)) return;
  console.warn(`Jafar warning - ${message}`, data); // eslint-disable-line
};

const error = (error) => {
  if (!shouldLog(logLevels.ERROR)) return;
  let jafarError = error;
  while (jafarError) {
    const args = [jafarError.toString()];
    if (jafarError.data) {
      Array.prototype.push.apply(args, ['\ndata: ', jafarError.data]);
    }
    console.error(...args); // eslint-disable-line
    jafarError = jafarError.subError;
  }
};

const shouldLog = level => logLevelsValue[level] <= logLevelsValue[logLevel] && console;

export const setLogLevel = (level) => {
  if (Object.values(logLevels).includes(level)) {
    logLevel = level;
  } else {
    const err = createError(ERROR_PREFIX, errors.INVALID_LOG_LEVEL, {}, [level]);
    error(err);
  }
  return logLevel;
};

export default {
  debug,
  warn,
  error,
};
