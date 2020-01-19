/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

const React = require('react');

const LiveProvider = require('react-live').LiveProvider;
const LiveEditor = require('react-live').LiveEditor;
const LiveError = require('react-live').LiveError;
const LivePreview = require('react-live').LivePreview;
class Demo extends React.Component {
  render() {
    const code = `
    class Counter extends React.Component {
      constructor() {
        super()
        this.state = { count: 0 }
      }
    
      componentDidMount() {
        this.interval = setInterval(() => {
          this.setState(state => ({ count: state.count + 1 }))
        }, 1000)
      }
    
      componentWillUnmount() {
        clearInterval(this.interval)
      }
    
      render() {
        return (
          <center>
            <h3>
              {this.state.count}
            </h3>
          </center>
        )
      }
    }
`;

    return (<LiveProvider code={code} scope={React}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>);
  }
}

module.exports = Demo;
