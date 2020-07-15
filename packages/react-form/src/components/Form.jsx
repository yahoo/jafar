/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import JForm from '@jafar/form';
import FormContext from './context';

export default class Form extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    model: PropTypes.object.isRequired,
    resources: PropTypes.object,
    settings: PropTypes.object,
    data: PropTypes.object,
    context: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // stored to compare pointer changes for re-init / other actions (react don't pass prevState in getDerivedStateFromProps)
    this.state = {
      propsModel: props.model, 
      propsContext: props.context,
      propsData: props.data,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // if model was changed (checking only for new pointer) - trigger init action
    if (props.model !== state.propsModel) {
      return ({ propsModel: props.model, needAction: 'init', destroyPrevModelId: state.propsModel.id });
    }
    // if context was changed (checking only for new pointer) - trigger changeContext action
    if (props.context !== state.propsContext) {
      return ({ propsContext: props.context, needAction: 'changeContext' });
    }
    // if data was changed (checking only for new pointer) - trigger changeData action
    if (props.data !== state.propsData) {
      return ({ propsData: props.data, needAction: 'changeData' });
    }
    return null;
  }

  render() {
    if (!this.state.form) {
      return null;
    }

    const context = {
      model: this.state.form.model,
      resources: this.state.form.resources,
      actions: {
        changeValue: this.privateForm.changeValue.bind(this.privateForm),
        changeData: this.privateForm.changeData.bind(this.privateForm),
        changeContext: this.privateForm.changeContext.bind(this.privateForm),
        changeState: this.privateForm.changeState.bind(this.privateForm),
        changeUi: this.privateForm.changeUi.bind(this.privateForm),
        submit: this.privateForm.submit.bind(this.privateForm),
        reset: this.privateForm.reset.bind(this.privateForm),
      },
      parent: this.context,
    };

    return (
      <FormContext.Provider value={context}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </FormContext.Provider>);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    switch (this.state.needAction) {
    case 'init': {
      if (this.state.destroyPrevModelId !== this.state.propsModel.id) {
        this.privateForm.destroy();
      }
      this.init();
      this.setState({ needAction: undefined, destroyPrevModelId: undefined });
      break;
    }
    case 'changeContext': {
      this.privateForm.changeContext(this.props.context);
      this.setState({ needAction: undefined });
      break;
    }
    case 'changeData': {
      this.privateForm.changeData(this.props.data);
      this.setState({ needAction: undefined });
      break;
    }
    default: {}
    }
  }

  init = () => {
    this.privateForm = new JForm();
    const contextOverride = this.props.context ? { context: this.props.context } : undefined;
    const model = Object.assign({}, this.props.model, contextOverride);
    this.privateForm.init(model, this.props.resources, this.props.settings, this.updatePublicForm);
  }

  componentWillUnmount() {
    this.privateForm.destroy();
    this.destroyed = true;
  }

  updatePublicForm = (form) => {
    if (this.destroyed) return;

    this.setState({ form });
  };
}
