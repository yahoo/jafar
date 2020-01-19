/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

 export const model = {
  id: 'dependencies',
  fields: {
    subject: {
      label: 'Subject',
      path: 'subject',
      dependencies: ['description'],
      validators: [{
        name: 'descriptionContainsSubject',
      }],
    },
    description: {
      label: 'Description',
      path: 'description',
      dependencies: ['subject'],
      requireTerm: {
        not: true,
        name: 'empty',
        args: { fieldId: 'subject' },
      },
      validators: [{
        name: 'descriptionContainsSubject',
      }],
    },
  },
};

export const resources = {
  validators: {
    descriptionContainsSubject: {
      func: (props) => {
        const description = (props.id === 'description' ? props.value : props.dependencies.description.value) || '';
        const subject = (props.id === 'subject' ? props.value : props.dependencies.subject.value) || '';
        return description.toLowerCase().indexOf(subject.toLowerCase()) > -1;
      },
      message: (props) => {
        const descriptionLabel = (props.id === 'description' ? props.label : props.dependencies.description.label) || '';
        const subjectLabel = (props.id === 'subject' ? props.label : props.dependencies.subject.label) || '';
        return `${subjectLabel} should be included in ${descriptionLabel.toLowerCase()}`;
      },
    },
  },
};

export default { model, resources };
