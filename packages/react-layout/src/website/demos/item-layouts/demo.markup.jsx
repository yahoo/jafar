/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import DemoMarkup from '../../components/DemoMarkup';

const demo = `import React from 'react';
import { FormContext, createForm } from '@jafar/react-form';
import { iterateSections, getSectionComponentBoxes } from '@jafar/react-layout/Section/utils';
import { iterateBoxes } from '@jafar/react-layout/Box/utils';
import SaveIcon from '@material-ui/icons/Save';
import Item from '@jafar/react-layout/Item';
import FormErrors from '@jafar/react-components/view/FormErrors';
import form from './form';
import sections from './sections';

class Demo extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    // apply exclude condition to sections - exclude section if all of its fields are excluded
    iterateSections(sections, this.applySectionsExclude);

    this.state = {
      item: {
        title: 'Employee',
        layout: 'scroll',
        size: 4,
        sections,
        mainActions: [{
          label: 'Cancel',
          type: 'tertiary',
          onClick: () => console.log('Cancel', this.context.model.data), // eslint-disable-line
        }, {
          label: 'Save & Close',
          type: 'secondary',
          disable: () => this.context.model.invalid,
          onClick: () => console.log('Save & Close', this.context.model.data), // eslint-disable-line
        }, {
          label: 'Save',
          type: 'primary',
          icon: SaveIcon,
          disable: () => this.context.model.invalid,
          onClick: () => console.log('Save & Close', this.context.model.data), // eslint-disable-line
          popover: {
            title: 'Handle Fields',
            open: () => this.context.model.invalid,
            component: FormErrors,
            props: { 
              onClickField: this.onClickField,
            },
          },
        }],
        optionsActions: [{
          label: 'Archive',
          onClick: () => {},
        }, {
          label: 'History',
          onClick: () => {},
          exclude: () => this.context.model.data.department === 'HR',
        }, {
          label: 'Report To HR',
          onClick: () => {},
          disable: () => this.context.model.data.department === 'HR',
        }, {
          label: 'Delete',
          onClick: () => {},
        }],
      },
    };
  }

  render() {
    return (<Item {...this.state.item} />);
  }

  onClickField = (fieldId) => {
    this.setState({
      item: {
        ...this.state.item,
        selected: { sectionId: this.getSectionId(fieldId), elementId: fieldId },
      },
    });
  }

  getSectionId = (fieldId) => {
    let sectionId;

    iterateSections(sections, (section) => {
      iterateBoxes(section.boxes, (box) => {
        if (box.props && box.props.id === fieldId) {
          sectionId = section.id;
        }
      });
    });

    return sectionId;
  }

  applySectionsExclude = (section) => {
    section.exclude = () => {
      const boxes = getSectionComponentBoxes(section);
      const fieldIds = boxes.map(box => box.props.id);
      const excluded = !fieldIds.find(fieldId => !this.context.model.fields[fieldId].excluded);
      return excluded;
    };
  }
}

export default createForm(form)(Demo);`;

export default function markup() {
  return (<DemoMarkup exampleName="item-layouts" data={true} demo={demo} />);
}
