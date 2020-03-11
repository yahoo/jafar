/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useState } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';
import Select from '@jafar/react-components/edit/Select';
import Checkbox from '@jafar/react-components/edit/Checkbox';
import terms from '@jafar/form/terms';
import Handler from './Handler';

let Term;

const TermWrapper = styled.div`
  margin-top: 15px;
`;

const defaultConditionalTerm = { operator: 'or', terms: [] };
const defaultLogicalTerm = {};

const ConditionalTerm = ({ value = defaultConditionalTerm, onValueChange }) => {

  const AddButton = withTheme(styled.div`
    margin-top: 15px;
    display: inline-block;
    cursor: pointer;
    color: ${props => props.theme.palette.secondary.main};
  `);

  const SubTermWrapper = styled.div`
    padding-bottom: 40px;
    border-bottom: 2px dashed #e1e1e1;
    margin: 40px 0 40px 70px;
  `;

  const onNotChanged = (not) => {
    const newValue = { ...value };
    if (not) {
      newValue.not = not;
    } else {
      delete newValue.not;
    }
    onValueChange(newValue);
  };

  const onOperatorChanged = (operator) => {
    const newValue = { ...value, operator };
    onValueChange(newValue);
  };

  const addTerm = () => {
    const newValue = { ...value };
    newValue.terms = [...newValue.terms];
    newValue.terms.push({});
    onValueChange(newValue);
  };

  const onTermValueChange = (termValue, index) => {
    const newValue = { ...value };
    newValue.terms = [...newValue.terms];
    if (!termValue) {
      newValue.terms.splice(index, 1);
    } else {
      newValue.terms[index] = termValue || {};
    }
    onValueChange(newValue);
  };

  const operatorItems = [
    { label: 'Or', value: 'or' },
    { label: 'And', value: 'and' },
  ];

  return (<TermWrapper>
    <Checkbox value={value.not} state={{ label: 'Not' }} onValueChange={onNotChanged} />
    <Select value={value.operator} required={true} state={{ items: operatorItems }} onValueChange={onOperatorChanged} />
    {
      value.terms.map((term, index) => (<SubTermWrapper key={index}><Term  
        value={term} 
        onValueChange={(validatorValue, isCustom) => onTermValueChange(validatorValue, index)}
      />
      </SubTermWrapper>))
    }
    <AddButton onClick={addTerm}>+ Add term</AddButton>
  </TermWrapper>);
};

const LogicalTerm = ({ value = defaultLogicalTerm, onValueChange }) => {
  const [termState, setTermState] = useState({ 
    options: Object.keys(terms),
    urlPrefix: 'https://yahoo.github.io/jafar/docs/term#',
  });

  const onNotChanged = (not) => {
    const newValue = { ...value };
    if (not) {
      newValue.not = not;
    } else {
      delete newValue.not;
    }
    onValueChange(newValue);
  };

  const onTermValueChange = (termValue, isCustom) => {
    let newValue;
    if (!termValue && !isCustom) {
      newValue = undefined;
    } else {
      newValue = termValue || {};
    }
    onValueChange(newValue);
  };
  
  return (<TermWrapper>
    <Checkbox value={value.not} state={{ label: 'Not' }} onValueChange={onNotChanged} />
    <Handler  
      value={value} 
      state={termState}
      onValueChange={(termValue, isCustom) => onTermValueChange(termValue, isCustom)}
      onStateChange={setTermState}
    />
  </TermWrapper>);
};

Term = ({ value, onValueChange }) => {

  const Wrapper = styled.div`
    max-width: 360px;
    width: 360px;
  `;

  const onTypeChanged = (type) => {
    let newValue;
    if (type) {
      newValue = type === 'CONDITIONAL' ? defaultConditionalTerm : defaultLogicalTerm;
    }
    onValueChange(newValue);
  };

  const typeItems = [
    { label: 'Conditional', value: 'CONDITIONAL' },
    { label: 'Logical', value: 'LOGICAL' },
  ];

  let type;
  if (value) {
    type = value.terms ? 'CONDITIONAL' : 'LOGICAL';
  }

  return (<Wrapper>
    <Select value={type} state={{ items: typeItems }} onValueChange={onTypeChanged} />
    {
      type === 'CONDITIONAL' && <ConditionalTerm value={value} onValueChange={onValueChange} />
    }
    {
      type === 'LOGICAL' && <LogicalTerm value={value} onValueChange={onValueChange} />
    }
  </Wrapper>);
};

export default Term;
