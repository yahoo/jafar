/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const React = require('react');

function DemoComponents(props) {
  return (
    <iframe title="editor demo" class="hosted-frame" demo={props.config.editorDemoUrl} style={{ marginTop: '-50px' }} />
  );
}

module.exports = DemoComponents;
