/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { iterateBoxes } from '../Box/utils';

export function iterateSectionsBoxes(sections = [], func) {
  sections.forEach((section) => {
    iterateSectionsBoxes(section.sections, func);
    iterateBoxes(section.boxes, func);
  });
}

export function iterateSections(sections = [], func) {
  sections.forEach((section) => {
    iterateSections(section.sections, func);
    func(section);
  });
}

export function getSectionComponentBoxes(section) {
  const boxes = [];
  iterateSectionsBoxes([section], (box) => {
    if (box.component) {
      boxes.push(box);
    }
  });
  return boxes;
}
