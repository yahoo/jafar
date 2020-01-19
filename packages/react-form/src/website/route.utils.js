/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export const getMenuItemByParams = (params, menu) => {
  const key = `/${params.levelA}/${params.levelB}`;
  let item = menu.find(parentItem => parentItem.id === key);
  let parent;
  if (!item) {
    menu.forEach(parentItem => {
      if (parentItem.id === `/${params.levelA}` && parentItem.items && parentItem.items.length) {
        parent = parentItem;
        item = parentItem.items.find(item => item.id === `/${params.levelA}/${params.levelB}`);
      }
    });
  }
  return { item, parent };
};
