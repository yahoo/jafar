/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import _TextInput from '@jafar/react-components/edit/Text';
import _NumberInput from '@jafar/react-components/edit/Number';
import _Checkbox from '@jafar/react-components/edit/Checkbox';
import _CheckboxCollection from '@jafar/react-components/edit/CheckboxCollection';
import _Select from '@jafar/react-components/edit/Select';
import _MultiSelect from '@jafar/react-components/edit/MultiSelect';
import _JsonEditor from '@jafar/react-components/edit/JsonEditor';
import _Switch from '@jafar/react-components/edit/Switch';
import _Url from '@jafar/react-components/view/Url';
import _Boolean from '@jafar/react-components/view/Boolean';
import _JsonView from '@jafar/react-components/view/JsonView';

export const TextInput = _TextInput;
export const NumberInput = _NumberInput;
export const Checkbox = _Checkbox;
export const CheckboxCollection = _CheckboxCollection;
export const Select = _Select;
export const MultiSelect = _MultiSelect;
export const JsonEditor = _JsonEditor;
export const Switch = _Switch;
export const Url = _Url;
export const JsonView = _JsonView;
export const Boolean = _Boolean;

// contains only common components of this app that any entity can use
export default {
  TextInput,
  NumberInput,
  Checkbox,
  CheckboxCollection,
  Select,
  MultiSelect,
  JsonEditor,
  Url,
  Switch,
  JsonView,
  Boolean,
};
