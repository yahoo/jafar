/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { Field } from '../src/components';

describe('Field', () => {
  it('rendered correctly', () => {
    const instance = new Field();
    expect(instance).toBeTruthy();
  });
});
