
import React, { useState, useEffect } from 'react';
import Boolean from '@jafar/react-components/view/Boolean';
import service from '../../../service';
import { Link, BooleanWrapper } from '../../List/Styled';

const References = ({ fieldId }) => {
  const [references, setReferences] = useState();

  useEffect(() => {
    const loadData = async () => {
      const forms = await service.searchEntity('form') || {};
      const referencedForms = forms.data.filter(form => (form.model.fields[fieldId] || {})._referenced);
      setReferences(referencedForms);
    };
    loadData();
  }, [fieldId]);
  
  return !references ? (null) : (<div>{references.length}</div>);
};

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
}, {
  label: 'Used by',
  content: (field) => <References fieldId={field.id} />,
}];
