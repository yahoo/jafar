/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
 gte, lte,
} from 'lodash';

export default {
  minLength: {
    defaultArgs: { value: 0 },
    func: props => gte(props.value.length, props.args.value),
    message: props => `Minimum length is ${props.args.value}`,
  },
  maxLength: {
    defaultArgs: { value: 0 },
    func: props => lte(props.value.length, props.args.value),
    message: props => `Maximum length is ${props.args.value}`,
  },
  min: {
    defaultArgs: { value: 0 },
    func: props => gte(props.value, props.args.value),
    message: props => `Minimum value is ${props.args.value}`,
  },
  max: {
    defaultArgs: { value: 0 },
    func: props => lte(props.value, props.args.value),
    message: props => `Maximum value is ${props.args.value}`,
  },
  between: {
    defaultArgs: { min: 0, max: 0 },
    func: props => gte(props.value, props.args.min) && lte(props.value, props.args.max),
    message: props => `Value should be between ${props.args.min} - ${props.args.max}`,
  },
  url: {
    func: props => props.value
      .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null, // eslint-disable-line
    message: () => `Invalid url`,
  },
  email: {
    func: props => props.value
      .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null, // eslint-disable-line
    message: () => `Invalid email`,
  },
  match: {
    defaultArgs: { value: /^(.*)$/ }, // eslint-disable-line
    func: props => props.value.match(props.args.value) !== null,
    message: props => `Invalid match to: ${props.args.value}`,
  },
};
