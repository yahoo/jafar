/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import AsyncMultiSelect from '@jafar/react-components/edit/AsyncMultiSelect';
import AsyncSelect from '@jafar/react-components/edit/AsyncSelect';
import CreatableMultiSelect from '@jafar/react-components/edit/CreatableMultiSelect';
import DatePicker from '@jafar/react-components/edit/DatePicker';
import DateTimePicker from '@jafar/react-components/edit/DateTimePicker';
import UrlInput from '@jafar/react-components/edit/Url';
import TextInput from '@jafar/react-components/edit/Text';
import NumberInput from '@jafar/react-components/edit/Number';
import PasswordInput from '@jafar/react-components/edit/Password';
import RadioGroup from '@jafar/react-components/edit/RadioGroup';
import TimePicker from '@jafar/react-components/edit/TimePicker';
import Checkbox from '@jafar/react-components/edit/Checkbox';
import CheckboxCollection from '@jafar/react-components/edit/CheckboxCollection';
import Select from '@jafar/react-components/edit/Select';
import MultiSelect from '@jafar/react-components/edit/MultiSelect';
import JsonEditor from '@jafar/react-components/edit/JsonEditor';
import Switch from '@jafar/react-components/edit/Switch';
import Url from '@jafar/react-components/view/Url';
import Date from '@jafar/react-components/view/Date';
import Number from '@jafar/react-components/view/Number';
import Text from '@jafar/react-components/view/Text';
import Boolean from '@jafar/react-components/view/Boolean';
import JsonView from '@jafar/react-components/view/JsonView';

const components = {
  AsyncMultiSelect,
  AsyncSelect,
  CreatableMultiSelect,
  DatePicker,
  DateTimePicker,
  UrlInput,
  TextInput,
  NumberInput,
  PasswordInput,
  RadioGroup,
  Checkbox,
  CheckboxCollection,
  Select,
  MultiSelect,
  JsonEditor,
  TimePicker,
  Url,
  Switch,
  JsonView,
  Boolean,
  Date,
  Text,
  Number,
};

export default {
  label: 'Component',
  description: 'Reflects the UI component',
  path: 'component',
  component: {
    name: 'Handler',
    state: {
      argsName: 'state',
      addArgsLabel: 'Add initial state',
      options: Object.keys(components),
      urlPrefix: 'https://yahoo.github.io/jafar/demo-react-components.html#',
    },
  },
  validators: ['customNameRequired'],
};
