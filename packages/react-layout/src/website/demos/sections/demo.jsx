/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { FormContext, createForm } from '@jafar-org/react-form';
import { getSectionComponentBoxes } from '../../../components/Section/utils';
import Section from '../../../components/Section';
import Styled from '../../components/StyledComponents';
import sections from './sections';
import form from './form';

class Demo extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.sections = sections;
  }

  render() {
    // filter empty sections (if all of the section's fields are excluded)
    const filteredSections = filterEmptySections(this.sections, this.context);

    if (filteredSections.length === 0) {
      return null;
    }

    return (
      <Styled.ItemWrapper>
        {
          filteredSections.map((section, index) => (<Section key={section.id} {...section}
            showBorder={ index < sections.length - 1 } />))
        }
      </Styled.ItemWrapper>);
  }
}

function filterEmptySections(sections = [], context) {
  const newSections = sections.map(s => ({ ...s }));
  return newSections.filter((section) => {
    const renderSections = filterEmptySections(section.sections, context);
    if (renderSections.length) {
      section.sections = renderSections;
    }
    return !(shouldExcludeSection(section, context)) || section.sections;
  });
}

function shouldExcludeSection(section, context) {
  const boxes = getSectionComponentBoxes(section);
  const fieldIds = boxes.map(box => box.props.id);
  const excluded = fieldIds
    .reduce((excluded, fieldId) => excluded && context.model.fields[fieldId].excluded, true);
  return excluded;
}

export default createForm(form)(Demo);
