/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import validators from '../src/validators';

describe('Validators', () => {
  describe('minLength', () => {
    describe('func', () => {
      it('fails when - value length lower than args value', () => {
        const props = { value: [], args: { value: 2 } };
        const result = validators.minLength.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value length equals to args value', () => {
        const props = { value: [1, 1], args: { value: 2 } };
        const result = validators.minLength.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value length greater than args value', () => {
        const props = { value: [1, 1, 1], args: { value: 2 } };
        const result = validators.minLength.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('message', () => {
      const props = { args: { value: 2 } };
      const result = validators.minLength.message(props);
      expect(result).toEqual('Minimum length is 2');
    });
  });

  describe('maxLength', () => {
    describe('func', () => {
      it('fails when - value greater lower than args value', () => {
        const props = { value: [1, 1, 1], args: { value: 2 } };
        const result = validators.maxLength.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value length equals to args value', () => {
        const props = { value: [1, 1], args: { value: 2 } };
        const result = validators.maxLength.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value length lower than args value', () => {
        const props = { value: [1], args: { value: 2 } };
        const result = validators.maxLength.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('message', () => {
      const props = { args: { value: 2 } };
      const result = validators.maxLength.message(props);
      expect(result).toEqual('Maximum length is 2');
    });
  });

  describe('min', () => {
    describe('func', () => {
      it('fails when - value lower than args value', () => {
        const props = { value: 1, args: { value: 2 } };
        const result = validators.min.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value equals to args value', () => {
        const props = { value: 2, args: { value: 2 } };
        const result = validators.min.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value greater than args value', () => {
        const props = { value: 3, args: { value: 2 } };
        const result = validators.min.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('message', () => {
      const props = { args: { value: 2 } };
      const result = validators.min.message(props);
      expect(result).toEqual('Minimum value is 2');
    });
  });

  describe('max', () => {
    describe('func', () => {
      it('fails when - value greater than args value', () => {
        const props = { value: 3, args: { value: 2 } };
        const result = validators.max.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value equals to args value', () => {
        const props = { value: 2, args: { value: 2 } };
        const result = validators.max.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value lower than args value', () => {
        const props = { value: 1, args: { value: 2 } };
        const result = validators.max.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('message', () => {
      const props = { args: { value: 2 } };
      const result = validators.max.message(props);
      expect(result).toEqual('Maximum value is 2');
    });
  });

  describe('between', () => {
    describe('func', () => {
      it('fails when - value greater than args max', () => {
        const props = { value: 6, args: { min: 2, max: 5 } };
        const result = validators.between.func(props);
        expect(result).toBeFalsy();
      });

      it('fails when - value lower than args min', () => {
        const props = { value: 1, args: { min: 2, max: 5 } };
        const result = validators.between.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value equals to args min', () => {
        const props = { value: 2, args: { min: 2, max: 5 } };
        const result = validators.between.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value equals to args max', () => {
        const props = { value: 5, args: { min: 2, max: 5 } };
        const result = validators.between.func(props);
        expect(result).toBeTruthy();
      });

      it('truthy when - value between args min and args max', () => {
        const props = { value: 4, args: { min: 2, max: 5 } };
        const result = validators.between.func(props);
        expect(result).toBeTruthy();
      });
    });

    describe('message', () => {
      const props = { args: { min: 2, max: 5 } };
      const result = validators.between.message(props);
      expect(result).toEqual('Value should be between 2 - 5');
    });
  });

  describe('url', () => {
    describe('func', () => {
      it('fails when - value is not valid url', () => {
        const props = { value: 'bla' };
        const result = validators.url.func(props);
        expect(result).toBeFalsy();
      });

      it('truthy when - value is valid url', () => {
        ['http://hola.com', 'https://hola.com'].forEach((value) => {
          const props = { value };
          const result = validators.url.func(props);
          expect(result).toBeTruthy();
        });
      });
    });

    describe('message', () => {
      const props = {};
      const result = validators.url.message(props);
      expect(result).toEqual('Invalid url');
    });
  });

  describe('email', () => {
    describe('func', () => {
      it('fails when - value is not email url', () => {
        ['http://hola.com', 'bla', 'www.gal.com'].forEach((value) => {
          const props = { value };
          const result = validators.email.func(props);
          expect(result).toBeFalsy();
        });
      });

      it('truthy when - value is valid email', () => {
        ['ross@friends.com'].forEach((value) => {
          const props = { value };
          const result = validators.email.func(props);
          expect(result).toBeTruthy();
        });
      });
    });

    describe('message', () => {
      const props = {};
      const result = validators.email.message(props);
      expect(result).toEqual('Invalid email');
    });
  });

  describe('match', () => {
    describe('func', () => {
      it('fails when - value does not match args.value', () => {
        ['ross', 'monica'].forEach((value) => {
          const props = { value, args: { value: /^Hello (.*)$/ } };
          const result = validators.match.func(props);
          expect(result).toBeFalsy();
        });
      });

      it('truthy when - value matches args.value', () => {
        ['Hello ross', 'Hello monica'].forEach((value) => {
          const props = { value, args: { value: /^Hello (.*)$/ } };
          const result = validators.match.func(props);
          expect(result).toBeTruthy();
        });
      });
    });

    describe('message', () => {
      const props = { args: { value: /^Hello (.*)$/ } };
      const result = validators.match.message(props);
      expect(result).toEqual(`Invalid match to: /^Hello (.*)$/`);
    });
  });
});
