/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from '@jafar/react-components/edit/Select';
import JsonEditor from '@jafar/react-components/edit/JsonEditor';
import TextInput from '@jafar/react-components/edit/Text';
import Switch from '@jafar/react-components/edit/Switch';
import Url from '@jafar/react-components/view/Url';

const Label = styled.div`
  margin-top: 10px;
  align-content: right;
  text-align: right;
  margin-top: -10px;
  position: relative;
  top: -18px;
`;

const Spaced = styled.div`
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  display: flex;

  > div:nth-child(1) {
    flex: 1;
  }

  > div:nth-child(2) {
    flex: 1;
    position: relative;
    top: 1px;
    margin-left: 10px;
  }
`;

export default ({ value = {}, state = {}, invalid, onValueChange, onStateChange }) => {
  const argsName = state.argsName || 'args';

  useEffect(() => {
    const isCustom = value.name && !state.options.includes(value.name);
    const selectValue = isCustom ? 'CUSTOM' : value.name;
    const customValue = isCustom ? value.name : undefined;
    onStateChange({ ...state, selectValue, customValue, argsChecked: !!value[argsName] });
  }, []);

  if (!Object.keys(state).includes('selectValue')) {  
    return (null);
  }

  const items = state.options.sort().map(x => ({ label: x, value: x }));
  items.unshift({ label: 'custom', value: 'CUSTOM' });

  const onSelectChange = (name) => {
    const isCustom = name === 'CUSTOM';
    const newName = isCustom ? undefined : name;
    const newValue = newName ? { ...value, name: newName } : undefined;
    onValueChange(newValue, isCustom);
    onStateChange({ ...state, selectValue: name, customValue: undefined });
  };

  const onCustomChange = (name) => {
    const newName = (name || '').trim();
    const newValue = newName ? { ...value, name: newName } : undefined;
    onValueChange(newValue, true);
    onStateChange({ ...state, customValue: newName });
  };

  const onCheckedArgsChange = (checked) => {
    const newValue = { ...value };
    delete newValue[argsName];
    onValueChange(newValue);
    onStateChange({ ...state, argsChecked: checked });
  };

  const onArgsChange = (args) => {
    const newValue = { ...value };
    newValue[argsName] = args;
    onValueChange(newValue);
  };

  return (<div>
    <InputWrapper>
      <Select 
        value={state.selectValue} 
        onValueChange={(name) => onSelectChange(name)} 
        state={{
          searchable: true,
          items,
        }} />
      {
        state.selectValue === 'CUSTOM' && <TextInput 
          value={state.customValue} 
          onValueChange={(name) => onCustomChange(name)} 
          state={{
            placeholder: 'Custom name',
          }} 
          invalid={invalid} />
      }
    </InputWrapper>
    { state.selectValue && <Spaced>
      <div>
        { state.addArgsLabel || 'Add args' }
        <Switch value={state.argsChecked} onValueChange={checked => onCheckedArgsChange(checked)} />
      </div>
      {
        state.selectValue !== 'CUSTOM' && <Label><Url 
          value={`${state.urlPrefix}${value.name.toLowerCase()}`} 
          state={{
            label: 'View details',
            target: '_blank',
          }
          } /></Label>
      }
      {
        state.argsChecked && <JsonEditor 
          value={value[argsName] || {}}
          onValueChange={(args) => onArgsChange(args)} 
        />
      }
       
    </Spaced>
    }  
  </div>);
};
