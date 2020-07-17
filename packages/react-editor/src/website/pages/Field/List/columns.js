
import React from 'react';
import Boolean from '@jafar/react-components/view/Boolean';
import { Link, BooleanWrapper } from '../../List/Styled';

export default ({ edit }) => [{
  label: 'Id',
  content: (field) => <Link onClick={() => edit(field)}>{field.id}</Link>,
}, {
  label: 'Label',
  content: (field) => field.label,
}, {
  label: 'Required',
  content: (field) => <BooleanWrapper><Boolean value={field.required} /></BooleanWrapper>,
}, {
  label: 'Validations',
  content: (field) => (field.validators || []).map(x => x.name).join(', '),
}, {
  label: 'Component',
  content: (field) => field.component ? field.component.name : '',
}];
