/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useEffect } from 'react';
import { withTheme } from '@material-ui/styles';
import styled from 'styled-components';
import validators from '@jafar/form/validators';
import Handler from './Handler';

const ValidatorWrapper = styled.div`
  padding-bottom: 40px;
  border-bottom: 2px dashed #e1e1e1;
  margin-bottom: 40px;
`;

const AddButton = withTheme(styled.div`
  display: inline-block;
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
`);


export default withTheme(({ value = [], state = {}, onValueChange, onStateChange }) => {
  const getInitialState = () => ({
    options: Object.keys(validators),
    urlPrefix: 'https://yahoo.github.io/jafar/docs/validators#',
  });

  useEffect(() => {
    const newState = { ...state, validatorsStates: [] };
    value.forEach((validator, index) => {
      newState.validatorsStates[index] = getInitialState();
    });
    onStateChange(newState);
  }, []); // eslint-disable-line

  if (!state.validatorsStates) {
    return (null);
  }

  const onValidatorValueChange = (validatorValue, isCustom, index) => {
    const newValue = [...value];
    if (!validatorValue && !isCustom) {
      newValue.splice(index, 1);
      onValidatorStateChange(undefined, index);
    } else {
      newValue[index] = validatorValue || {};
    }
    onValueChange(newValue);
  };

  const onValidatorStateChange = (validatorState, index) => {
    onStateChange(({ state }) => {
      const newState = { ...state };
      newState.validatorsStates = [...newState.validatorsStates];
      if (!validatorState) {
        newState.validatorsStates.splice(index, 1);
      } else {
        newState.validatorsStates[index] = validatorState;
      }
      return newState;
    });
  };

  const addValidator = () => {
    const newState = { ...state };
    newState.validatorsStates = [...newState.validatorsStates];
    newState.validatorsStates[value.length] = getInitialState();
    onStateChange(newState);
    onValidatorValueChange({}, false, value.length); 
  };

  return (<div>
    {
      value.map((validator, index) => (<ValidatorWrapper key={index}><Handler  
        value={validator} 
        state={state.validatorsStates[index]}
        onValueChange={(validatorValue, isCustom) => onValidatorValueChange(validatorValue, isCustom, index)}
        onStateChange={(validatorState) => onValidatorStateChange(validatorState, index)}
      />
      </ValidatorWrapper>))
    }
    <AddButton aria-label="add-validator" onClick={addValidator}>+ Add validator</AddButton>
  </div>);
});
