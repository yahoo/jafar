/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

module.exports = (config) => {
  config.snapshotSerializers = config.snapshotSerializers || [];
  if (!config.snapshotSerializers.includes('enzyme-to-json/serializer')) {
    config.snapshotSerializers.push('enzyme-to-json/serializer');
  }
};