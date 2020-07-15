import React, { useContext } from 'react';
import { FormContext } from '@jafar/react-form';
import Select from '@jafar/react-components/edit/Select';
import NumberInput from '@jafar/react-components/edit/Number';
import styled from 'styled-components';

const Row = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
`;

const Dimensions = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  > div {
    width: 50px;
    margin-right: 10px;
  }
  > span {
    line-height: 28px;
    margin-right: 10px;
  }
`;

export default ({ value = ['. . .', '. . .', '. . .'], onValueChange }) => {
  const context = useContext(FormContext);
  const fields = context.parent.parent.model.data.model.fields || {};
  const items = Object.keys(fields).map(id => ({ value: id, label: fields[id].label || id }));
  
  const selectState = {
    items,
    searchable: true,
    placeholder: '',
  };

  const colsState = {
    placeholder: 'columns',
    min: 1,
  };

  const rowsState = {
    placeholder: 'rows',
    min: 1,
  };

  const rowToArray = row => row.split(' ').filter(x => x !== '');
  const getFieldIds = row => rowToArray(row).map(x => (x === '.' ? undefined : x));
  const cols = getFieldIds(value[0]).length;
  const rows = value.length;

  const onRowsChange = (num) => { 
    const newValue = value.slice(0, num);
    while (newValue.length < num) {
      let newRow = [];
      while (newRow.length < cols) {
        newRow.push('.');
      }
      newValue.push(newRow.join(' '));
    }
    onValueChange(newValue);
  };

  const onColsChange = (num) => {
    const newValue = value.map(row => {
      let fieldIds = rowToArray(row).slice(0, num);
      while (fieldIds.length < num) {
        fieldIds.push('.');
      }
      return fieldIds.join(' ');
    });
    onValueChange(newValue);
  }

  const onFieldChange = (row, col, fieldId) => {
    const newValue = [...value];
    const rowArr = rowToArray(newValue[row]);
    rowArr[col] = fieldId || '.';
    newValue[row] = rowArr.join(' ');
    onValueChange(newValue); 
  }

  return (<div>
    <Dimensions>
      <span>Dimensions: </span>
      <NumberInput value={cols} state={colsState} onValueChange={onColsChange} /> 
      <span> x </span>
      <NumberInput value={rows} state={rowsState} onValueChange={onRowsChange} />
    </Dimensions>
    {
      value.map((row, rowIndex) => {
        const fieldIds = getFieldIds(row);
        return (<Row key={rowIndex}>
          {
            fieldIds.map((fieldId, colIndex) => (<Select key={colIndex} value={fieldId} state={selectState} 
              onValueChange={fieldId => onFieldChange(rowIndex, colIndex, fieldId)} />))
          }
        </Row>);
      })
    }
  </div>);
};
