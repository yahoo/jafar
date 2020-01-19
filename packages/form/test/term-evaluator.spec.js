/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import isTermTruthy from '../src/term-evaluator';

describe('Term Evaluator', () => {
  describe('isTermTruthy', () => {
    let termsMapper;
    let getTermsProps;

    beforeEach(() => {
      getTermsProps = term => ({});

      termsMapper = {
        notDefined: { func: props => undefined },
        truthy: { func: props => true },
        falsy: { func: props => false },
        asyncFalsy: { 
          func: props => new Promise((resolve) => {
            setTimeout(() => {
              resolve(false);
            });
          }),
        },
        asyncTruthy: { 
          func: props => new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            });
          }),
        },
      };
    });

    describe('Pass - when term structure is:', () => {
      async function shouldPass(term) {
        const result = await isTermTruthy(term, termsMapper, getTermsProps);
        expect(result).toBeTruthy();
      }
      it('(true)', async () => {
        await shouldPass({
          name: 'truthy',
        });
      });

      it('(async true)', async () => {
        await shouldPass({
          name: 'asyncTruthy',
        });
      });

      it('not(false)', async () => {
        await shouldPass({
          name: 'falsy',
          not: true,
        });
      });

      it('not(async false)', async () => {
        await shouldPass({
          name: 'asyncFalsy',
          not: true,
        });
      });

      it('(true) or (true)', async () => {
        await shouldPass({
          operator: 'or',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncTruthy',
          }],
        });
      });

      it('(true) or (false)', async () => {
        await shouldPass({
          operator: 'or',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncFalsy',
          }],
        });
      });

      it('(false) or not(false)', async () => {
        await shouldPass({
          operator: 'or',
          terms: [{
            name: 'falsy',
          }, {
            name: 'asyncFalsy',
            not: true,
          }],
        });
      });

      it('(true) and (true)', async () => {
        await shouldPass({
          operator: 'and',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncTruthy',
          }],
        });
      });

      it('(true) and not(false)', async () => {
        await shouldPass({
          operator: 'and',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncFalsy',
            not: true,
          }],
        });
      });

      it('not((true) and (false))', async () => {
        await shouldPass({
          operator: 'and',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncFalsy',
          }],
          not: true,
        });
      });

      it('(true) and ((true) or (false)', async () => {
        await shouldPass({
          operator: 'and',
          terms: [{
            name: 'truthy',
          }, {
            operator: 'or',
            terms: [{
              name: 'truthy',
            }, {
              name: 'asyncFalsy',
            }],
          }],
        });
      });
    });

    describe('Not Pass - when term structure is:', () => {
      async function shouldNotPass(term) {
        const result = await isTermTruthy(term, termsMapper, getTermsProps);
        expect(result).toBeFalsy();
      }
      it('(undefined)', async () => {
        await shouldNotPass({
          name: 'notDefined',
        });
      });

      it('(false)', async () => {
        await shouldNotPass({
          name: 'falsy',
        });
      });
      it('(async false)', async () => {
        await shouldNotPass({
          name: 'asyncFalsy',
        });
      });

      it('not(true)', async () => {
        await shouldNotPass({
          name: 'truthy',
          not: true,
        });
      });

      it('not(async true)', async () => {
        await shouldNotPass({
          name: 'asyncTruthy',
          not: true,
        });
      });

      it('(false) or (false)', async () => {
        await shouldNotPass({
          operator: 'or',
          terms: [{
            name: 'falsy',
          }, {
            name: 'asyncFalsy',
          }],
        });
      });

      it('(false) and (false)', async () => {
        await shouldNotPass({
          operator: 'and',
          terms: [{
            name: 'falsy',
          }, {
            name: 'asyncFalsy',
          }],
        });
      });

      it('(false) or not(true)', async () => {
        await shouldNotPass({
          operator: 'or',
          terms: [{
            name: 'falsy',
          }, {
            name: 'asyncTruthy',
            not: true,
          }],
        });
      });

      it('(false) and not(true)', async () => {
        await shouldNotPass({
          operator: 'and',
          terms: [{
            name: 'falsy',
          }, {
            name: 'asyncTruthy',
            not: true,
          }],
        });
      });

      it('not((true) or (false))', async () => {
        await shouldNotPass({
          operator: 'or',
          terms: [{
            name: 'truthy',
          }, {
            name: 'asyncFalsy',
          }],
          not: true,
        });
      });

      it('(true) and ((true) and (false)', async () => {
        await shouldNotPass({
          operator: 'and',
          terms: [{
            name: 'truthy',
          }, {
            operator: 'and',
            terms: [{
              name: 'truthy',
            }, {
              name: 'asyncFalsy',
            }],
          }],
        });
      });
    });
  });
});
