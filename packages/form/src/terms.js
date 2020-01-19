/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import {
  isEqual,
  isNil,
  gt,
  gte,
  lt,
  lte,
  cloneDeep,
  pullAllWith,
} from 'lodash';
import hooks from './hooks';

export default {
  empty: {
    func: props => hooks.isEmpty({ id: props.args.fieldId, value: getDependentValue(props) }),
  },
  equals: {
    func: props => isEqual(getDependentValue(props), props.args.value),
  },
  exists: {
    func: props => !isNil(getDependentValue(props)),
  },
  lowerThan: {
    func: props => lt(getDependentValue(props), props.args.value),
  },
  greaterThan: {
    func: props => gt(getDependentValue(props), props.args.value),
  },
  lowerThanOrEquals: {
    func: props => lte(getDependentValue(props), props.args.value),
  },
  greaterThanOrEquals: {
    func: props => gte(getDependentValue(props), props.args.value),
  },
  equalsOne: {
    func: props => pullAllWith(cloneDeep(props.args.value), [getDependentValue(props)], isEqual).length
      < props.args.value.length,
  },
  includes: {
    func: props => pullAllWith(cloneDeep(getDependentValue(props)), [props.args.value], isEqual).length
    < getDependentValue(props).length,
  },
  includesOne: {
    defaultArgs: { value: [] },
    func: props => pullAllWith(cloneDeep(getDependentValue(props)), props.args.value, isEqual).length
    < getDependentValue(props).length,
  },
  includesAll: {
    defaultArgs: { value: [] },
    func: props => pullAllWith(cloneDeep(getDependentValue(props)), props.args.value, isEqual).length
    <= getDependentValue(props).length - props.args.value.length,
  },
};

function getDependentValue({ args, dependencies, context }) {
  return args.fieldId ? dependencies[args.fieldId].value : context[args.contextId];
}
