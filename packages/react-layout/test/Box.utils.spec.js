/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { iterateBoxes } from '../src/components/Box/utils';

describe('utils', () => {
  describe('iterateBoxes', () => {
    it('Should iterate ok', () => {
      const components = {
        field: () => {},
      };

      const boxes = [{
        direction: 'row',
        boxes: [{
          component: 'field',
        }, {
          component: 'field',
        }],
      }];

      iterateBoxes(boxes, (box) => {
        if (box.component) {
          box.component = components[box.component];
        }
      });

      expect(boxes).toEqual([{
        direction: 'row',
        boxes: [{
          component: components.field,
        }, {
          component: components.field,
        }],
      }]);
    });
  });
});
