/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import terms from '../src/terms';

describe('Terms', () => {
  // dependencies is a part of the form.data
  // term is done by: (fieldValue) func (value)
  // value is optional
  // examples:
  // "Gal" exists
  // 18 lowerThan 22
  function createDependentFieldProps(fieldId, fieldValue, value) {
    return {
      dependencies: {
        [fieldId]: { value: fieldValue },
      },
      args: {
        fieldId,
        value,
      },
    };
  }

  function createDependentContextProps(contextId, contextValue, value) {
    return {
      context: {
        [contextId]: contextValue,
      },
      args: {
        contextId,
        value,
      },
    };
  }

  function testDependentValue(createProps) {

    describe('equals', () => {
      it('truthy - (age:18 equals 18)', () => {
        const props = createProps('age', 18, 18);
        const result = terms.equals.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - objects equals - (someField:{ a: { b: "c" } } equals { a: { b: "c" } })', () => {
        const props = createProps('someField', { a: { b: 'c' } }, { a: { b: 'c' } });
        const result = terms.equals.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy (age:22 equals 18)', () => {
        const props = createProps('age', 22, 18);
        const result = terms.equals.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('empty', () => {
      it('truthy when - using empty string - (name:"" empty)', () => {
        const props = createProps('name', '');
        const result = terms.empty.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - using null - (name:null empty)', () => {
        const props = createProps('name', null);
        const result = terms.empty.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - using undefined - (name:undefined empty)', () => {
        const props = createProps('name', undefined);
        const result = terms.empty.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - using empty array - (name:[] empty)', () => {
        const props = createProps('name', []);
        const result = terms.empty.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - using empty object - (name:{} empty)', () => {
        const props = createProps('name', {});
        const result = terms.empty.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy when - using string - (name:"gal" empty)', () => {
        const props = createProps('name', 'gal');
        const result = terms.empty.func(props);
        expect(result).toBeFalsy();
      });

      it('falsy when - using array - (name:["gal"] empty)', () => {
        const props = createProps('name', ['gal']);
        const result = terms.empty.func(props);
        expect(result).toBeFalsy();
      });

      it('falsy when - using object - (name:{ some: "gal" } empty)', () => {
        const props = createProps('name', { some: 'gal' });
        const result = terms.empty.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('exists', () => {
      it('truthy when - has value - (someField:"hello" exists)', () => {
        const props = createProps('someField', 'hello');
        const result = terms.exists.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - empty string - (someField:"" exists)', () => {
        const props = createProps('someField', '');
        const result = terms.exists.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - empty object - (someField:{} exists)', () => {
        const props = createProps('someField', {});
        const result = terms.exists.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - empty array - (someField:[] exists)', () => {
        const props = createProps('someField', []);
        const result = terms.exists.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - number zero - (someField:0 exists)', () => {
        const props = createProps('someField', 0);
        const result = terms.exists.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy when - null - (someField:null exists)', () => {
        const props = createProps('someField', null);
        const result = terms.exists.func(props);
        expect(result).toBeFalsy();
      });

      it('falsy when - undefined - (someField:undefined exists)', () => {
        const props = createProps('someField', undefined);
        const result = terms.exists.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('lowerThan', () => {
      it('truthy - (age:18 lowerThan 22)', () => {
        const props = createProps('age', 18, 22);
        const result = terms.lowerThan.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (age:18 lowerThan 13)', () => {
        const props = createProps('age', 18, 13);
        const result = terms.lowerThan.func(props);
        expect(result).toBeFalsy();
      });

      it('falsy when - equal value - (age:18 lowerThan 18)', () => {
        const props = createProps('age', 18, 18);
        const result = terms.lowerThan.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('greaterThan', () => {
      it('truthy - (age:18 greaterThan 13)', () => {
        const props = createProps('age', 18, 13);
        const result = terms.greaterThan.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (age:18 greaterThan 22)', () => {
        const props = createProps('age', 18, 22);
        const result = terms.greaterThan.func(props);
        expect(result).toBeFalsy();
      });

      it('falsy when - equal value - (age:18 greaterThan 18)', () => {
        const props = createProps('age', 18, 18);
        const result = terms.greaterThan.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('lowerThanOrEquals', () => {
      it('truthy - (age:18 lowerThanOrEquals 22)', () => {
        const props = createProps('age', 18, 22);
        const result = terms.lowerThanOrEquals.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (age:18 lowerThanOrEquals 13)', () => {
        const props = createProps('age', 18, 13);
        const result = terms.lowerThanOrEquals.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - equal value - (age:18 lowerThanOrEquals 18)', () => {
        const props = createProps('age', 18, 18);
        const result = terms.lowerThanOrEquals.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('greaterThanOrEquals', () => {
      it('truthy - (age:18 greaterThanOrEquals 13)', () => {
        const props = createProps('age', 18, 13);
        const result = terms.greaterThanOrEquals.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (age:18 greaterThanOrEquals 22)', () => {
        const props = createProps('age', 18, 22);
        const result = terms.greaterThanOrEquals.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - equal value - (age:18 greaterThanOrEquals 18)', () => {
        const props = createProps('age', 18, 18);
        const result = terms.greaterThanOrEquals.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('equalsOne', () => {
      it('truthy - (color:"BLUE" equalsOne ["GREEN", "BLUE", "BLACK"])', () => {
        const props = createProps('color', 'BLUE', ['GREEN', 'BLUE', 'BLACK']);
        const result = terms.equalsOne.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy - abstract compare', () => {
        const props = createProps('color', { c: 'BLUE' }, [{ c: 'GREEN' }, { c: 'BLUE' }, { c: 'BLACK' }]);
        const result = terms.equalsOne.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (color:"PINK" equalsOne ["GREEN", "BLUE", "BLACK"])', () => {
        const props = createProps('color', 'PINK', ['GREEN', 'BLUE', 'BLACK']);
        const result = terms.equalsOne.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('includes', () => {

      it('truthy - (color: ["GREEN", "BLUE", "WHITE"] includes "GREEN")', () => {
        const props = createProps('color', ['GREEN', 'BLUE', 'WHITE'], 'GREEN');
        const result = terms.includes.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy - abstract compare', () => {
        const props = createProps('color', [{ c: 'GREEN' }, { c: 'BLUE' }, { c: 'WHITE' }], { c: 'GREEN' });
        const result = terms.includes.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (color: ["GREEN", "BLACK"] includes "PINK")', () => {
        const props = createProps('color', ['GREEN', 'BLACK'], 'PINK');
        const result = terms.includes.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('includesAll', () => {
      it('truthy when - same value - (color: ["GREEN", "BLUE", "BLACK"] includesAll ["GREEN", "BLUE", "BLACK"])', () => {
        const props = createProps('color', ['GREEN', 'BLUE', 'BLACK'], ['GREEN', 'BLUE', 'BLACK']);
        const result = terms.includesAll.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - part of values - (color: ["GREEN", "BLUE", "BLACK"] includesAll ["GREEN", "BLUE"])', () => {
        const props = createProps('color', ['GREEN', 'BLUE', 'BLACK'], ['GREEN', 'BLUE']);
        const result = terms.includesAll.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - abstract compare', () => {
        const props = createProps('color', [{ c: 'GREEN' }, { c: 'BLUE' }, { c: 'BLACK' }], [{ c: 'GREEN' }, { c: 'BLUE' }]);
        const result = terms.includesAll.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (color: ["GREEN", "BLACK"] includesAll ["GREEN", "BLUE", "BLACK"])', () => {
        const props = createProps('colors', ['GREEN', 'BLACK'], ['GREEN', 'BLUE', 'BLACK']);
        const result = terms.includesAll.func(props);
        expect(result).toBeFalsy();
      });
    });

    describe('includesOne', () => {
      it('truthy - (color: ["GREEN", "BLUE", "WHITE"] includesOne ["GREEN", "BLACK"])', () => {
        const props = createProps('color', ['GREEN', 'BLUE', 'WHITE'], ['GREEN', 'BLACK']);
        const result = terms.includesOne.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy  when - abstract compare', () => {
        const props = createProps('color', [{ c: 'GREEN' }, { c: 'BLUE' }, { c: 'WHITE' }], [{ c: 'GREEN' }, { c: 'BLACK' }]);
        const result = terms.includesOne.func(props);
        expect(result).toBeTruthy();
      });

      it('falsy - (color: ["GREEN", "BLACK"] includesOne ["PINK", "WHITE"])', () => {
        const props = createProps('color', ['GREEN', 'BLACK'], ['PINK', 'WHITE']);
        const result = terms.includesOne.func(props);
        expect(result).toBeFalsy();
      });
    });
  }

  testDependentValue(createDependentFieldProps);
  testDependentValue(createDependentContextProps);
});
