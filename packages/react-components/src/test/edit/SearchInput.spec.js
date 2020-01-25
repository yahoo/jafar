import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchInput from '../../components/edit/CheckboxCollection/internal/SearchInput';

describe('<SearchInput />', () => {
  let component;
  let onChangeSpy;
  let onSearchSpy;
  const value = 'avocado';
  const placeholder = 'Search Food';
  const disabled = false;

  beforeEach(() => {
    onChangeSpy = jest.fn();
    onSearchSpy = jest.fn();
  });

  it('should render provided data', () => {
    component = shallow(
      getComponent(value, placeholder, disabled, onChangeSpy, onSearchSpy)
    );
    expect(component).toMatchSnapshot();
  });

  it('should trigger onChange callback on value change', () => {
    component = mount(
      getComponent(value, placeholder, disabled, onChangeSpy, onSearchSpy)
    );
    const newValue = 'banana';
    component.find('input').simulate('change', { target: { value: newValue } });
    expect(onChangeSpy).toHaveBeenCalledWith(newValue);
  });

  it('should trigger onSearch callback on enter', () => {
    component = mount(
      getComponent(value, placeholder, disabled, onChangeSpy, onSearchSpy)
    );
    component.find('input').simulate('keypress', { charCode: 13 });
    expect(onSearchSpy).toHaveBeenCalledWith(value);
  });

  it('should not trigger onSearch callback on keypress that is not enter', () => {
    component = mount(
      getComponent(value, placeholder, disabled, onChangeSpy, onSearchSpy)
    );
    component.find('input').simulate('keypress', { charCode: 10 });
    expect(onSearchSpy).not.toHaveBeenCalled();
  });

  it('should trigger onSearch callback on search icon click', () => {
    component = mount(
      getComponent(value, placeholder, disabled, onChangeSpy, onSearchSpy)
    );
    component.find('button').simulate('click');
    expect(onSearchSpy).toHaveBeenCalledWith(value);
  });

  function getComponent(value, placeholder, disabled, onChange, onSearch) {
    return (
      <SearchInput
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onSearch={onSearch}
      />
    );
  }
});
