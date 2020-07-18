import React from 'react';
import Boolean from '@jafar/react-components/view/Boolean';
import * as Styled from './Styled';

export default ({ setEditingField }) => [{
  label: 'Id',
  content: ({ fieldId, field }) => (<Styled.FieldLink onClick={() => setEditingField({ fieldId, field })}>
    {fieldId}</Styled.FieldLink>),
}, {
  label: 'Label',
  content: ({ field }) => field.label,
}, {
  label: 'Dependencies',
  content: ({ field }) => (field.dependencies || []).join(', '),
}, {
  label: 'Required',
  content: ({ field }) => <Styled.BooleanWrapper><Boolean value={field.required} /></Styled.BooleanWrapper>,
}, {
  label: 'Validations',
  content: ({ field }) => (field.validators || []).map(x => x.name).join(', '),
}, {
  label: 'Component',
  content: ({ field }) => field.component ? field.component.name : '',
}, {
  label: 'Referenced',
  content: ({ field }) => <Styled.BooleanWrapper><Boolean value={!!field._referenced} /></Styled.BooleanWrapper>,
}];
