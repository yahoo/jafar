/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

 import hooks from '../src/hooks';

 describe('Hooks', () => {
  describe('isEmpty', () => {
    it('value is undefined', () => {
      expect(hooks.isEmpty({ value: undefined })).toBeTruthy();
    });
    it('value is null', () => {
      expect(hooks.isEmpty({ value: null })).toBeTruthy();
    });
    it('value is empty string', () => {
      expect(hooks.isEmpty({ value: '' })).toBeTruthy();
    });
    it('value is empty array', () => {
      expect(hooks.isEmpty({ value: [] })).toBeTruthy();
    });
    it('value is empty object', () => {
      expect(hooks.isEmpty({ value: {} })).toBeTruthy();
    });
    it('value is number zero', () => {
      expect(hooks.isEmpty({ value: 0 })).toBeFalsy();
    });
    it('value is number', () => {
      expect(hooks.isEmpty({ value: 4 })).toBeFalsy();
    });
    it('value is string', () => {
      expect(hooks.isEmpty({ value: 'hi' })).toBeFalsy();
    });
    it('value is non empty object', () => {
      expect(hooks.isEmpty({ value: { a: 1 } })).toBeFalsy();
    });
    it('value is non empty array', () => {
      expect(hooks.isEmpty({ value: [1] })).toBeFalsy();
    });
    it('value is date', () => {
      expect(hooks.isEmpty({ value: new Date() })).toBeFalsy();
    });
  });
  describe('emptyMessage', () => {
    it('should return correct message', () => {
      expect(hooks.emptyMessage()).toEqual('Field required');
    });
  });
 });
