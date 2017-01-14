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

var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    target: './target.js',
    sink: './sink.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader:  'babel',
      include: [
        __dirname,
        path.normalize(path.join(__dirname, '..', '..', 'utils'))
      ],
    }],
  },
};
