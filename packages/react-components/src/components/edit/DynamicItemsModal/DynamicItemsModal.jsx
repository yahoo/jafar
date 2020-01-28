/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Item from '@jafar-org/react-layout/Item';
import { clone } from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, FormContext } from '@jafar-org/react-form';
import Styled from './DynamicItemsModal.Styles';

const deafultLabels = {
  addModalTitle: 'Add',
  editModalTitle: 'Edit',
  addButtonLabel: 'Add',
  saveButtonLabel: 'Save',
  cancelButtonLabel: 'Cancel',
};

/**
 * Represent array of objects. Can add / edit / remove items from the array
 * 
 * Import <a target="_blank" href=
 "https://github.com/yahoo/jafar/blob/master/packages/react-components/src/components/edit/
 DynamicItemsModal/DynamicItemsModal.jsx">
 DynamicItemsModal</a> from '@jafar-org/react-components/edit/DynamicItemsModal'
 */
class DynamicItemsModal extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    value: PropTypes.array,
    state: PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
      addModalTitle: PropTypes.string,
      editModalTitle: PropTypes.string,
      addButtonLabel: PropTypes.string,
      saveButtonLabel: PropTypes.string,
      cancelButtonLabel: PropTypes.string,
    }).isRequired,
    onValueChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func,
  };

  static defaultProps = {
    value: [],
    state: {
    },
  };
 
  constructor(props, context) {
    super(props);
    this.resource = getResource(this.props.state, context);
    this.initialData = this.resource.form.model.data || {};
  }

  open = () => {
    const state = clone(this.props.state);
    this.dialogTitle = state.addModalTitle || deafultLabels.addModalTitle;
    state.isOpen = true;
    this.props.onStateChange(state);
  };

  edit = index => {
    const state = clone(this.props.state);
    const item = this.props.value[index];
    this.resource.form.model.data = { ...item };
    this.dialogTitle = state.editModalTitle || deafultLabels.editModalTitle;
    state.isOpen = true;
    state.isEditMode = true;
    state.editIndex = index;
    this.props.onStateChange(state);
  };
    
  add = item => {
    const value = clone(this.props.value);
    const state = clone(this.props.state);
    if (state.isEditMode) {
      value[state.editIndex] = item;
      this.resource.form.model.data = this.initialData;
    } else {
      value.push(item);
    }
    this.props.onValueChange(value);
    this.close();
  };
    
  remove = index => {
    const value = clone(this.props.value);
    value.splice(index, 1);
    this.props.onValueChange(value);
  };
    
  close = () => {
    const state = clone(this.props.state);
    this.resource.form.model.data = this.initialData;
    state.isOpen = false;
    state.isEditMode = false;
    delete state.editIndex;
    this.props.onStateChange(state);
  };

  renderItemsDisplay = () => {
    return (<Styled.ItemsListContainer>
      {
        this.props.value.map((item, index) => 
          (<Styled.ListItem key={index}>
            <Styled.ItemRendererContainer>{this.resource.itemRenderer(item, index)} </Styled.ItemRendererContainer>
            <Styled.ActionsContainer>
              <Fab style={{ margin: '0 5px' }} size="small" color="secondary" onClick={() => { this.edit(index); }}>
                <EditIcon />
              </Fab>
              <Fab style={{ margin: '0 5px' }} size="small" color="secondary" onClick={() => { this.remove(index); }}>
                <RemoveIcon />
              </Fab>
            </Styled.ActionsContainer>
          </Styled.ListItem>))
      }
    </Styled.ItemsListContainer>);
  };

  render() {
    return (<div>
      {this.renderItemsDisplay()}
      <Fab size="small" color="primary" onClick={this.open}>
        <AddIcon />
      </Fab>
      <Styled.AddLabel>{this.props.state.addButtonLabel || deafultLabels.addButtonLabel}</Styled.AddLabel>

      {this.props.state.isOpen && (
        <Form model={this.resource.form.model} resources={this.resource.form.resources}>
          <DialogForm 
            item={this.resource.item} 
            add={this.add} 
            close={this.close}
            title={this.dialogTitle}
            isOpen={this.props.state.isOpen}
            saveButtonLabel={this.props.state.saveButtonLabel || deafultLabels.saveButtonLabel}
            cancelButtonLabel={this.props.state.cancelButtonLabel || deafultLabels.cancelButtonLabel} />
        </Form>)}
    </div>);
  }
}

const DialogForm = ({ item, isOpen, add, close, title, saveButtonLabel, cancelButtonLabel }) => {
  const formContext = useContext(FormContext);

  return (<Dialog open={!!isOpen} onClose={close}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Item {...item} />
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary">{cancelButtonLabel}</Button>
      <Button onClick={() => add(formContext.model.data)} color="primary" 
        disabled={formContext.model.invalid} autoFocus={true}>{saveButtonLabel}</Button>
    </DialogActions>
  </Dialog>);
};


function getResource (state, context) {
  const key = state && state.resourceId ? state.resourceId : '';
  return context.resources[key];
}

export default DynamicItemsModal;
