/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import dateformat from 'dateformat';
import { isNil, get } from 'lodash';

const withNil = (props, func) => (isNil(props.value) ? props.value : func(props));

export default {
  toString: {
    func: props => withNil(props, props => String(props.value)),
  },
  toNumber: {
    func: props => withNil(props, props => Number(props.value)),
  },
  toDate: {
    func: props => withNil(props, props => new Date(props.value)),
  },
  toBoolean: {
    func: props => props.value === 'true' || !!props.value,
  },
  formatDate: {
    defaultArgs: { format: 'mm-dd-yyyy' },
    func: props => withNil(props, props => dateformat(props.value, props.args.format)),
  },
  split: {
    defaultArgs: { separator: ',' },
    func: props => withNil(props, props => props.value.split(props.args.separator)),
  },
  join: {
    defaultArgs: { separator: ',' },
    func: props => withNil(props, props => props.value
      .map(v => (props.args.path ? get(v, props.args.path) : v))
      .join(props.args.separator)),
  },
  joinKeys: {
    defaultArgs: { separator: ',' },
    func: props => withNil(props, props => Object.keys(props.value).join(props.args.separator)),
  },
  joinValues: {
    defaultArgs: { separator: ',' },
    func: props => withNil(props, props => Object.values(props.value)
      .map(v => (props.args.path ? get(v, props.args.path) : v))
      .join(props.args.separator)),
  },
  jsonStringify: {
    func: props => JSON.stringify(props.value),
  },
  jsonParse: {
    func: props => withNil(props, props => JSON.parse(props.value)),
  },
};
