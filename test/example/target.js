/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * A TodoMVC++ app for trying out the inspector
 *
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom/fiber');

var node = document.createElement('div');
document.body.appendChild(node);

class Counter extends React.Component {
  state = { value: 0 };
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  tick() {
    this.setState(({ value }) => ({ value: value + 1 }))
  }
  render() {
    return this.state.value % 2 === 0 ? null : <tr><td>{this.state.value}</td></tr>;
  }
}

function CoolRows() {
  return [
    <tr><td>Hello</td></tr>,
    <Counter />,
    <tr><td>World</td></tr>
  ]
}

ReactDOM.render(
  <table><tbody><CoolRows /></tbody></table>,
  node
);
