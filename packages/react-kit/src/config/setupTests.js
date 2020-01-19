/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const ReactDOM = require('react-dom');
const React = require('react');

React.useLayoutEffect = React.useEffect;

Enzyme.configure({ adapter: new Adapter() });
global.React = React;
global.ReactDOM = ReactDOM;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
global.shallow = Enzyme.shallow;

global.flushAllPromises = () => new Promise(resolve => setImmediate(resolve()));
