/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import introduction from './introduction';
import demos from './demos';

const docs = {
  overview: { label: 'Overview', href: '/docs/react-layout' },
  item: { label: 'Item', href: '/docs/react-layout#item' },
  section: { label: 'Section', href: '/docs/react-layout#section' },
};

export default [{
  id: '/overview/introduction',
  label: 'Introduction',
  demo: introduction,
  isLeaf: true,
}, {
  id: '/item',
  label: 'Item',
  items: [
    getSubItem('item', 'layouts', 'item-layouts', 'Layouts', [docs.overview, docs.item]),
    getSubItem('item', 'responsive', 'item-responsive', 'Responsive', [docs.overview, docs.item]),
    getSubItem('item', 'wizard', 'item-wizard', 'Wizard', [docs.overview]),
    getSubItem('item', 'sections', 'sections', 'Sections - Boxes', [docs.overview, docs.section]),
    getSubItem('item', 'sections-grid', 'sections-grid', 'Sections - Grid', [docs.overview, docs.section]),
  ],
}];

function getSubItem(parent, item, folder, label, docs, demoWait = 0) {
  const name = folder.replace(/-([a-z])/g, g => g[1].toUpperCase());
  return {
    id: `/${parent}/${item}`,
    folder,
    label,
    demo: demos[name].demo,
    description: demos[name].description,
    markup: demos[name].markup,
    e2e: demos[name].e2e,
    docs,
    hideChildren: true,
    demoWait,
    items: [
      { id: `/${parent}/${item}/html`, label: 'html', hide: true },
      { id: `/${parent}/${item}/code`, label: 'code', hide: true },
    ],
  };
}
