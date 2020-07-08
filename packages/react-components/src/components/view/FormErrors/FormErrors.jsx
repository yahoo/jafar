/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import FormContext from '@jafar/react-form/context';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

const defaultLabels = {
  required: 'Required',
  invalid: 'Invalid',
};

const Wrapper = styled.div`
  > div {
    padding-top: 20px;
    &:first-child {
      padding-top: 0px;
    }
  }
`;

const FieldTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
`;

const FieldLink = withTheme(styled.div`
  list-style-type: none;
  margin-top: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.secondary.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
  &:hover {
    text-decoration: underline;
  };
`);


const Fields = ({
  fields, title, onClickField,
}) => (fields.length > 0 && <div>
  <FieldTitle>{title}</FieldTitle>
  { fields.map(field => (<FieldLink key={field.id} onClick={() => { onClickField(field.id); }}>{field.label}</FieldLink>)) }
</div>);

const mapFieldsErrors = (fields, fieldIds) => {
  const requiredFields = [];
  const invalidFields = [];

  Object.keys(fields)
    .filter(fieldId => !fieldIds || fieldIds.includes(fieldId))
    .forEach((fieldId) => {
      const field = fields[fieldId];
      const required = field.errors.find(err => err.name === 'required');
      if (required) {
        requiredFields.push({ id: fieldId, label: field.label, error: required });
      } else if (field.errors.length) {
        invalidFields.push({ id: fieldId, label: field.label, error: field.errors[0] });
      }
    });

  return { required: requiredFields, invalid: invalidFields };
};

/**
 * Showing Jafar form's errors
 * 
 * Import <a target="_blank" 
 href="https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/view/FormErrors/FormErrors.jsx">
 FormErrors</a> from '@jafar/react-components/view/FormErrors'
 */
function FormErrors({ labels = defaultLabels, onClickField, fields }) {
  const form = React.useContext(FormContext);
  const invalidFields = mapFieldsErrors(form.model.fields, fields);

  return (
    <Wrapper>
      <Fields fields={invalidFields.required} title={labels.required} onClickField={onClickField} isFirst={true} />
      <Fields fields={invalidFields.invalid} title={labels.invalid} onClickField={onClickField} />
    </Wrapper>
  );
}

FormErrors.propTypes = {
  labels: PropTypes.shape({
    required: PropTypes.string,
    invalid: PropTypes.string,
  }),
  onClickField: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.string),
};

export default FormErrors;
