/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import * as RouteUtils from './route.utils';
const menu = [{
  id: '/getting-started',
  label: 'Getting Started',
  items: [{
    id: '/getting-started/overview',
    label: 'Overview',
  }, {
    id: '/getting-started/installation',
    label: 'Installation',
  }],
}, {
  id: '/components',
  label: 'Components',
  items: [{
    id: '/components/item',
    label: 'Item',
  }, {
    id: '/components/item-breakpoints',
    label: 'ItemBreakpoints',
  }],
}];

describe('RouteUtils', () => {
  describe('getMenuItemByParams', () => {
    it('should return the relevant menu item', () => {
      const params = {
        levelA: 'getting-started',
        levelB: 'overview',
      };
      const res = RouteUtils.getMenuItemByParams(params, menu);
      expect(res.item.id).toEqual('/getting-started/overview');
    });
  });
});
