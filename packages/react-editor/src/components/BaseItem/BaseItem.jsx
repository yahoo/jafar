/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { FormContext } from '@jafar/react-form';
import { iterateSections } from '@jafar/react-layout/Section/utils';
import { iterateBoxes } from '@jafar/react-layout/Box/utils';
import Item from '@jafar/react-layout/Item';
import FormErrors from '@jafar/react-components/view/FormErrors';
import JsonView from '@jafar/react-components/view/JsonView';
import Styled from './Styled';

// Should be a class for cases entities want to extend or change things like this.item data
export default class BaseItem extends React.Component {
  static contextType = FormContext;

  static defaultProps = {
    title: 'Base Item',
    sections: [],
    onCancel: () => {},
    onSave: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      showJson: false,
      selected: undefined,
    };

    const mainActions = [{
      label: 'Cancel',
      type: 'tertiary',
      onClick: this.cancel,
    }, {
      label: 'Save',
      type: 'primary',
      disable: () => this.context.model.invalid,
      onClick: this.save,
      popover: {
        title: 'Handle Fields',
        open: () => this.context.model.invalid,
        component: FormErrors,
        props: { 
          onClickField: this.onClickInvalidField,
        },
      },
    }];
  
    const optionsActions = [{
      label: this.state.showJson ? 'Hide Json' : 'Show Json',
      onClick: () => { 
        this.item.optionsActions[0].label = !this.state.showJson ? 'Hide Json' : 'Show Json';
        this.setState({ ...this.state, showJson: !this.state.showJson });
      },
    }];

    this.item = {
      title: props.title,
      layout: 'scroll',
      sections: props.sections,
      mainActions,
      optionsActions,
    };
  }

  getSectionId = (fieldId) => {
    let sectionId;
    iterateSections(this.sections, (section) => {
      iterateBoxes(section.boxes, (box) => {
        if (box.props && box.props.id === fieldId) {
          sectionId = section.id;
        }
      });
    });
    return sectionId;
  };

  onClickInvalidField = (fieldId) => {
    this.setState({ ...this.state, selected: { sectionId: this.getSectionId(fieldId), elementId: fieldId } });
  };

  cancel = () => {
    this.props.onCancel();
  };

  save = async () => {
    this.props.onSave({ data: this.context.model.data });
  };

  render = () => (<Styled.Wrapper>
    <Item {...this.item} selected={this.state.selected} />
    {
      this.state.showJson &&
      <Styled.JsonViewWrapper>
        <JsonView value={this.context.model.data} />
      </Styled.JsonViewWrapper>
    }
  </Styled.Wrapper>)
}
