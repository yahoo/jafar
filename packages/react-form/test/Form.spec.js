/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import * as JForm from '@jafar/form';
import { Form } from '../src/components';

describe('Form', () => {
  const model = { id: 'mockId' };
  const resources = {};
  const settings = {};
  const initMockFunction = jest.fn();
  const mockFunction = jest.fn();
  let element;

  beforeEach(() => {
    JForm.default.prototype.init = initMockFunction;
    JForm.default.prototype.changeValue = mockFunction;
    JForm.default.prototype.changeState = mockFunction;
    JForm.default.prototype.changeUi = mockFunction;
    JForm.default.prototype.changeData = mockFunction;
    JForm.default.prototype.changeContext = mockFunction;
    JForm.default.prototype.destroy = mockFunction;
    element = shallow(<Form model={model} resources={resources} settings={settings}><div>Mock Child</div></Form>);
    element.instance().init();
  });
  it('rendered and init correctly', () => {
    expect(element).toMatchSnapshot();
    expect(element.instance().state).toEqual({ propsModel: model });
  });

  it('render when state.form defined correctly', () => {
    element.instance().state.form = { model, resources };
    expect(element.instance().render()).toMatchSnapshot();
  });

  it('getDerivedStateFromProps - gets same model instance and return correct state changes', () => {
    const props = { model };
    const state = { propsModel: model };
    const result = Form.getDerivedStateFromProps(props, state);
    expect(result).toEqual(null);
  });

  it('getDerivedStateFromProps - gets new model reference and return correct state changes', () => {
    const props = { model: { id: 'new-form' } };
    const state = { propsModel: model };
    const result = Form.getDerivedStateFromProps(props, state);
    expect(result).toEqual({ propsModel: props.model, needAction: 'init', destroyPrevModelId: state.propsModel.id });
  });

  it('getDerivedStateFromProps - gets new context reference and return correct state changes', () => {
    const props = { context: { userId: '123' } };
    const state = { propsContext: { userId: '456' } };
    const result = Form.getDerivedStateFromProps(props, state);
    expect(result).toEqual({ propsContext: props.context, needAction: 'changeContext'  });
  });

  it('getDerivedStateFromProps - gets new data reference and return correct state changes', () => {
    const props = { data: { a: 'a' } };
    const state = { propsData: { b: 'b' } };
    const result = Form.getDerivedStateFromProps(props, state);
    expect(result).toEqual({ propsData: props.data, needAction: 'changeData'  });
  });

  it('componentDidMount - init form', () => {
    element.instance().componentDidMount();
    expect(initMockFunction).toHaveBeenCalledWith(model, resources, settings, element.instance().updatePublicForm);
  });

  it('componentDidUpdate - re-init not needed', () => {
    element.instance().init = jest.fn();
    element.instance().componentDidUpdate();
    expect(element.instance().init).not.toHaveBeenCalled();
  });

  it('componentDidUpdate - re-init needed, state.destroyPrevModelId equals to state.propsModel.id', () => {
    element.instance().state.needAction = 'init';
    element.instance().state.destroyPrevModelId = element.instance().state.propsModel.id;
    element.instance().init = jest.fn();
    element.instance().setState = jest.fn();
    element.instance().componentDidUpdate();
    expect(mockFunction).not.toHaveBeenCalled();
    expect(element.instance().init).toHaveBeenCalled();
    expect(element.instance().setState).toHaveBeenCalledWith({ needAction: undefined, destroyPrevModelId: undefined });
  });

  it('componentDidUpdate - re-init needed, state.destroyPrevModelId not equals to state.propsModel.id', () => {
    element.instance().state.needAction = 'init';
    element.instance().state.destroyPrevModelId = 'prev-id';
    element.instance().init = jest.fn();
    element.instance().setState = jest.fn();
    element.instance().componentDidUpdate();
    expect(mockFunction).toHaveBeenCalled();
    expect(element.instance().init).toHaveBeenCalled();
    expect(element.instance().setState).toHaveBeenCalledWith({ needAction: undefined, destroyPrevModelId: undefined });
  });

  it('componentDidUpdate - change context needed', () => {
    const context = { a: 1 };
    element.instance().state.needAction = 'changeContext';
    element.instance().setState = jest.fn();
    element.instance().props = { context };
    element.instance().componentDidUpdate();
    expect(mockFunction).toHaveBeenCalledWith(context);
    expect(element.instance().setState).toHaveBeenCalledWith({ needAction: undefined });
  });

  it('componentDidUpdate - change data needed', () => {
    const data = { a: 1 };
    element.instance().state.needAction = 'changeData';
    element.instance().setState = jest.fn();
    element.instance().props = { data };
    element.instance().componentDidUpdate();
    expect(mockFunction).toHaveBeenCalledWith(data);
    expect(element.instance().setState).toHaveBeenCalledWith({ needAction: undefined });
  });

  it('componentWillUnmount - destroys the form', () => {
    element.instance().componentWillUnmount();
    expect(element.instance().destroyed).toBeTruthy();
    expect(mockFunction).toHaveBeenCalled();
  });

  it('updatePublicForm is setting state to new form object when form component is not destroyed', () => {
    const newForm = { model: { id: 'new-form' }, resources: {} };
    element.instance().setState = jest.fn();
    element.instance().updatePublicForm(newForm);
    expect(element.instance().setState).toHaveBeenCalledWith({ form: newForm });
  });

  it('updatePublicForm is not setting state when form component is destroyed', () => {
    const newForm = { id: 'new-form' };
    element.instance().setState = jest.fn();
    element.instance().destroyed = true;
    element.instance().updatePublicForm(newForm);
    expect(element.instance().setState).not.toHaveBeenCalled();
  });
});
