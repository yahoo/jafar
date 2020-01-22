/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormContext, createForm } from '@jafar-org/react-form';
import FormErrors from '@jafar-org/react-components/view/FormErrors';
import SaveIcon from '@material-ui/icons/Save';
import { iterateSections, getSectionComponentBoxes } from '../../../components/Section/utils';
import { iterateBoxes } from '../../../components/Box/utils';
import Item from '../../../components/Item';
import Styled from '../../components/StyledComponents';
import sections from './sections';
import form from './form';

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
    return (
      <React.Fragment>
        <div id="layout-select" style={{ marginBottom: '40px' }}>
          {['scroll', 'tabs', 'mobile', 'undefined'].map(layout => (
            <FormControlLabel
              key={layout}
              value={layout}
              aria-checked={this.state.item.layout === layout}
              control={<Radio color="primary" checked={this.state.item.layout === layout} onChange={this.handleChangeLayout} />}
              label={layout}
              labelPlacement="end"
            />))}
        </div>
        <Styled.ItemWrapper>
          <Item {...this.state.item} layout={this.state.item.layout === 'undefined' ? undefined : this.state.item.layout} />
        </Styled.ItemWrapper>
      </React.Fragment>);
  }

  handleChangeLayout = (event) => {
    this.setState({
      item: { ...this.state.item, layout: event.target.value },
    });
  };

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

export default createForm(form)(Demo);
