/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { noop } from 'lodash';

export const model = {
  id: 'some-form-id',
  fields: {
    name: {
      path: 'name',
      component: {
        name: 'inputText',
        state: {},
        modelState: {},
        prevState: undefined,
        prevValue: undefined,
      },
      formatter: { name: 'addPrefix', args: { prefix: 'Formatted ' } },
      parser: { name: 'removePrefix', args: { prefix: 'Formatted ' } },
      validators: [{ name: 'uniqueName' }],
      excludeTerm: { name: 'myCustomTerm' },
      disableTerm: { name: 'myCustomTerm' },
      requireTerm: { name: 'myCustomTerm' },
      disabled: false,
      excluded: false,
      errors: [],
    },
    lastName: {
      path: 'lastName',
      formatter: undefined,
      parser: undefined,
      required: false,
      excluded: false,
      disabled: false,
      dependencies: ['name'],
      context: ['userId'],
      dependenciesChange: { name: 'lastNameDependenciesChange' },
      errors: [],
    },
  },
  data: {
    name: 'Rachel',
    lastName: 'Green',
  },
  initializedData: {
    name: 'Rachel',
    lastName: 'Green',
  },
  context: {
    userId: '123',
    companyId: '789',
  },
  invalid: false,
  dirty: false,
  pendingActions: [],
};

export const resources = {
  components: {
    inputText: { 
      renderer: noop,
      stateChange: (props) => {
        if (props.value === 'Monica') {
          return { ...props.state, mock: 1 };
        }
        if (props.state.loading) {
          return { ...props.state, loading: false };
        }
      },
    },
  },
  conversions: {
    addPrefix: { func: props => `${props.args.prefix}${props.value}` },
    removePrefix: { func: props => props.value.replace(props.args.prefix, '') }, // remove 'Formatted ' prefix
  },
  dependenciesChanges: {
    lastNameDependenciesChange: { func: noop },
  },
  validators: {
    uniqueName: {
      func: () => true,
      message: noop,
    },
  },
  terms: {
    myCustomTerm: { func: noop },
  },
  hooks: {
    beforeAction: noop,
    afterAction: noop,
    afterChangeData: () => {}, // don't convert to noop
  },
};

const settings = {
  changeValueDebounceWait: 200,
  changeValueDebounceMaxWait: 30000,
  changeStateDebounceWait: 200,
  changeStateDebounceMaxWait: 30000,
};

export default { model, resources, settings };
