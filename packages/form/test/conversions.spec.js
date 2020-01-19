/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import conversions from '../src/conversions';

describe('Conversions', () => {
  describe('toString', () => {
    it('value is undefined', () => {
      const result = conversions.toString.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.toString.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is number zero', () => {
      const result = conversions.toString.func({ value: 0 });
      expect(result).toEqual('0');
    });

    it('value is number', () => {
      const result = conversions.toString.func({ value: 4 });
      expect(result).toEqual('4');
    });

    it('value is negative number', () => {
      const result = conversions.toString.func({ value: -4 });
      expect(result).toEqual('-4');
    });

    it('value is boolean true', () => {
      const result = conversions.toString.func({ value: true });
      expect(result).toEqual('true');
    });

    it('value is boolean false', () => {
      const result = conversions.toString.func({ value: false });
      expect(result).toEqual('false');
    });

    it('value is string', () => {
      const result = conversions.toString.func({ value: 'hi' });
      expect(result).toEqual('hi');
    });
  });

  describe('toNumber', () => {
    it('value is undefined', () => {
      const result = conversions.toNumber.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.toNumber.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is string', () => {
      const result = conversions.toNumber.func({ value: '4' });
      expect(result).toEqual(4);
    });

    it('value is number zero', () => {
      const result = conversions.toNumber.func({ value: 0 });
      expect(result).toEqual(0);
    });

    it('value is number', () => {
      const result = conversions.toNumber.func({ value: 4 });
      expect(result).toEqual(4);
    });

    it('value is negative number', () => {
      const result = conversions.toNumber.func({ value: -4 });
      expect(result).toEqual(-4);
    });

    it('value is boolean true', () => {
      const result = conversions.toNumber.func({ value: true });
      expect(result).toEqual(1);
    });

    it('value is boolean false', () => {
      const result = conversions.toNumber.func({ value: false });
      expect(result).toEqual(0);
    });

    it('value is date', () => {
      const result = conversions.toNumber.func({ value: new Date('06-22-1989')});
      expect(typeof result).toEqual('number');
    });
  });

  describe('toDate', () => {
    it('value is undefined', () => {
      const result = conversions.toDate.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.toDate.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is number', () => {
      const result = conversions.toDate.func({ value: 614465999820 });
      expect(result.constructor.name).toEqual('Date');
    });

    it('value is string', () => {
      const result = conversions.toDate.func({ value: '06-22-1989' });
      expect(result).toEqual(new Date('06-22-1989'));
    });
  });

  describe('toBoolean', () => {
    it('value is undefined', () => {
      const result = conversions.toBoolean.func({ value: undefined });
      expect(result).toEqual(false);
    });

    it('value is null', () => {
      const result = conversions.toBoolean.func({ value: null });
      expect(result).toEqual(false);
    });

    it('value is number zero', () => {
      const result = conversions.toBoolean.func({ value: 0 });
      expect(result).toEqual(false);
    });

    it('value is number', () => {
      const result = conversions.toBoolean.func({ value: 4 });
      expect(result).toEqual(true);
    });

    it('value is negative number', () => {
      const result = conversions.toBoolean.func({ value: -4 });
      expect(result).toEqual(true);
    });

    it('value is boolean true', () => {
      const result = conversions.toBoolean.func({ value: true });
      expect(result).toEqual(true);
    });

    it('value is boolean false', () => {
      const result = conversions.toBoolean.func({ value: false });
      expect(result).toEqual(false);
    });

    it('value is string', () => {
      const result = conversions.toBoolean.func({ value: 'hi' });
      expect(result).toEqual(true);
    });

    it('value is empty string', () => {
      const result = conversions.toBoolean.func({ value: '' });
      expect(result).toEqual(false);
    });
  });

  describe('formatDate', () => {
    it('value is undefined', () => {
      const result = conversions.formatDate.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.formatDate.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is Date', () => {
      const result = conversions.formatDate.func({ value: new Date('06-22-1989'), args: { format: 'mm-dd-yyyy' } });
      expect(result).toEqual('06-22-1989');
    });
  });

  describe('split', () => {
    it('value is undefined', () => {
      const result = conversions.split.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.split.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is string', () => {
      const result = conversions.split.func({ value: 'Rachel;Monica;Ross', args: { separator: ';' } });
      expect(result).toEqual(['Rachel', 'Monica', 'Ross']);
    });
  });

  describe('join', () => {
    it('value is undefined', () => {
      const result = conversions.join.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.join.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is array of strings', () => {
      const result = conversions.join.func({ value: ['Rachel', 'Monica', 'Ross'], args: {} });
      expect(result).toEqual('Rachel,Monica,Ross');
    });

    it('value is array of string with separator', () => {
      const result = conversions.join.func({ value: ['Rachel', 'Monica', 'Ross'], args: { separator: ';' } });
      expect(result).toEqual('Rachel;Monica;Ross');
    });

    it('value is array of objects', () => {
      const value = [{ name: 'Rachel' }, { name: 'Monica' }, { name: 'Ross' }];
      const result = conversions.join.func({ value, args: { path: 'name' } });
      expect(result).toEqual('Rachel,Monica,Ross');
    });
  });

  describe('joinKeys', () => {
    it('value is undefined', () => {
      const result = conversions.joinKeys.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.joinKeys.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is array', () => {
      const result = conversions.joinKeys.func({ value: { RED: 'Red', BLUE: 'Blue', GREEN: 'Green' }, args: {} });
      expect(result).toEqual('RED,BLUE,GREEN');
    });

    it('value is array with separator', () => {
      const result = conversions.joinKeys.func({ value: { RED: 'Red', BLUE: 'Blue', GREEN: 'Green' }, args: { separator: ', ' } });
      expect(result).toEqual('RED, BLUE, GREEN');
    });
  });

  describe('joinValues', () => {
    it('value is undefined', () => {
      const result = conversions.joinValues.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.joinValues.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is array', () => {
      const result = conversions.joinValues.func({ value: { RED: 'Red', BLUE: 'Blue', GREEN: 'Green' }, args: {} });
      expect(result).toEqual('Red,Blue,Green');
    });

    it('value is array with separator', () => {
      const result = conversions.joinValues.func({ value: { RED: 'Red', BLUE: 'Blue', GREEN: 'Green' }, args: { separator: ', ' } });
      expect(result).toEqual('Red, Blue, Green');
    });

    it('value is array with separator and sub path', () => {
      const value = {
        RED: { color: 'Red' },
        BLUE: { color: 'Blue' },
        GREEN: { color: 'Green' },
      };
      const result = conversions.joinValues.func({ value, args: { separator: ', ', path: 'color' } });
      expect(result).toEqual('Red, Blue, Green');
    });
  });

  describe('jsonStringify', () => {
    it('value is undefined', () => {
      const result = conversions.jsonStringify.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.jsonStringify.func({ value: null });
      expect(result).toEqual('null');
    });

    it('value is any object', () => {
      const result = conversions.jsonStringify.func({ value: { a: 'b' }, args: {} });
      expect(result).toEqual('{"a":"b"}');
    });
  });

  describe('jsonParse', () => {
    it('value is undefined', () => {
      const result = conversions.jsonParse.func({ value: undefined });
      expect(result).toEqual(undefined);
    });

    it('value is null', () => {
      const result = conversions.jsonParse.func({ value: null });
      expect(result).toEqual(null);
    });

    it('value is any object', () => {
      const result = conversions.jsonParse.func({ value: '{"a":"b"}', args: {} });
      expect(result).toEqual({ a: 'b' });
    });
  });
});
