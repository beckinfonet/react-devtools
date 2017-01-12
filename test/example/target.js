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
var ReactDOM = require('react-dom');

function Simple() {
  return <h1>Hi</h1>;
}

var node = document.createElement('div');
document.body.appendChild(node);
ReactDOM.render(<Simple />, node);
