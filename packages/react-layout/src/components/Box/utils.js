/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export function iterateBoxes(boxes = [], func) {
  boxes.forEach((box) => {
    iterateBoxes(box.boxes, func);
    func(box);
  });
}
