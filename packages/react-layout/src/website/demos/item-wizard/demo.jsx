/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext, useState } from 'react';
import { FormContext, createForm } from '@jafar/react-form';
import FormErrors from '@jafar/react-components/view/FormErrors';
import { iterateBoxes } from '../../../components/Box/utils';
import ItemView from '../../../components/ItemView';
import Styled from '../../components/StyledComponents';
import sections from './sections';
import form from './form';

const getSectionFieldsIds = (section) => {
  const fieldsIds = [];

  iterateBoxes(section.boxes, (box) => {
    if (box.props && box.props.id) {
      fieldsIds.push(box.props.id);
    }
  });

  (section.sections || []).forEach(s => 
    Array.prototype.push.apply(fieldsIds, getSectionFieldsIds(s)));

  return fieldsIds;
};

const isSectionFieldsInvalid = (section, model) => {
  const fieldsIds = getSectionFieldsIds(section);
  return fieldsIds.filter(id => model.fields[id].invalid).length > 0;
};

const refs = {
  sections: React.createRef(),
  button: React.createRef(),
};

const scrollToField = (fieldId) => {
  const sections = refs.sections.current;
  sections.scrollTo({
    top: sections.querySelector(`#${fieldId}`).offsetTop - sections.offsetTop - 10,
    left: 0,
    behavior: 'smooth',
  });
};

const Demo = () => {
  const context = useContext(FormContext);
  const [step, setStep] = useState(0);

  // prepare tabs
  const tabs = {
    items: sections.map((section, index) => ({ value: section.id, label: section.title, disabled: index !== step })),
    value: sections[step].id,
    onChange: (e, sectionId) => setStep(sections.findIndex(x => x.id === sectionId)),
  };

  // prepare footer actions
  const isSectionInvalid = isSectionFieldsInvalid(sections[step], context.model);

  const actions = {
    PREV: {
      label: 'Prev',
      type: 'secondary',
      disabled: step === 0,
      onClick: () => setStep(step - 1),
    },
    NEXT: {
      label: 'Next',
      type: 'primary',
      disabled: isSectionInvalid,
      onClick: () => setStep(step + 1),
      elementRef: refs.button,
      popover: {
        title: 'Handle Fields',
        targetRef: refs.button,
        open: () => isSectionInvalid,
        component: FormErrors,
        props: { 
          onClickField: scrollToField,
        },
      },
    },
    SAVE: {
      label: 'Save',
      type: 'primary',
      disabled: context.model.invalid,
      onClick: () => console.log('Save', context.model.data), // eslint-disable-line
      elementRef: refs.button,
      popover: {
        title: 'Handle Fields',
        targetRef: refs.button,
        open: () => context.model.invalid,
        component: FormErrors,
        props: { 
          onClickField: scrollToField,
        },
      },
    },
  };

  const item = {
    title: 'Employee',
    sections: [sections[step]],
    sectionsRef: refs.sections,
    tabs,
    footer: {
      actions: [actions.PREV, (step === (sections.length - 1)) ? actions.SAVE : actions.NEXT],
    },
  };

  return (<Styled.ItemWrapper><ItemView {...item} /></Styled.ItemWrapper>);
};

export default createForm(form)(Demo);
