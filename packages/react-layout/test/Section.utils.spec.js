/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { iterateSectionsBoxes } from '../src/components/Section/utils';

describe('utils', () => {
  describe('iterateSectionsBoxes', () => {
    it('Should iterate ok', () => {
      const components = {
        field: () => {},
      };

      const sections = [{
        id: 'raw-data',
        title: 'Raw Data',
        sections: [{
          id: 'raw-data-general',
          title: 'General',
          boxes: [{
            direction: 'row',
            boxes: [{
              direction: 'column',
              boxes: getComponentsNamesBoxes(['id']),
            }, {
              direction: 'column',
              boxes: getComponentsNamesBoxes(['modifier']),
            }],
          }],
          level: 1,
        }],
      }];

      iterateSectionsBoxes(sections, (box) => {
        if (box.component) {
          box.component = components[box.component];
        }
      });

      expect(sections).toEqual([{
        id: 'raw-data',
        title: 'Raw Data',
        sections: [{
          id: 'raw-data-general',
          title: 'General',
          boxes: [{
            direction: 'row',
            boxes: [{
              direction: 'column',
              boxes: getComponentsBoxes(['id']),
            }, {
              direction: 'column',
              boxes: getComponentsBoxes(['modifier']),
            }],
          }],
          level: 1,
        }],
      }]);

      function getComponentsNamesBoxes(fields) {
        return fields.map(id => ({ component: 'field', props: { id } }));
      }

      function getComponentsBoxes(fields) {
        return fields.map(id => ({ component: components.field, props: { id } }));
      }
    });
  });
});
