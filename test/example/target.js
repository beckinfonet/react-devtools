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

var dotStyle = {
  position: 'absolute',
  background: '#61dafb',
  font: 'normal 15px sans-serif',
  textAlign: 'center',
  cursor: 'pointer',
};

var containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

var targetSize = 25;

class Dot extends React.Component {
  constructor() {
    super();
    this.state = { hover: false };
  }
  enter() {
    this.setState({
      hover: true
    });
  }
  leave() {
    this.setState({
      hover: false
    });
  }
  render() {
    var props = this.props;
    var s = props.size * 1.3;
    var style = {
      ...dotStyle,
      width: s + 'px',
      height: s + 'px',
      left: (props.x) + 'px',
      top: (props.y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px',
      background: this.state.hover ? '#ff0' : dotStyle.background
    };
    return (
      <div style={style} onMouseEnter={() => this.enter()} onMouseLeave={() => this.leave()}>
        {this.state.hover ? '*' + props.text + '*' : props.text}
      </div>
    );
  }
}

function SierpinskiTriangle({ x, y, s, children }) {
  if (s <= targetSize) {
    return (
      <Dot
        x={x - (targetSize / 2)}
        y={y - (targetSize / 2)}
        size={targetSize}
        text={children}
      />
    );
    return r;
  }
  var newSize = s / 2;
  var slowDown = false;
  if (slowDown) {
    var e = performance.now() + 0.8;
    while (performance.now() < e) {
      // Artificially long execution time.
    }
  }

  s /= 2;

  return [
    <SierpinskiTriangle x={x} y={y - (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
    <SierpinskiTriangle x={x - s} y={y + (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
    <SierpinskiTriangle x={x + s} y={y + (s / 2)} s={s}>
      {children}
    </SierpinskiTriangle>,
  ];
}
SierpinskiTriangle.shouldComponentUpdate = function(oldProps, newProps) {
  var o = oldProps;
  var n = newProps;
  return !(
    o.x === n.x &&
    o.y === n.y &&
    o.s === n.s &&
    o.children === n.children
  );
};

class ExampleApplication extends React.Component {
  constructor() {
    super();
    this.state = { seconds: 0 };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000);
  }
  tick() {
    ReactDOM.unstable_deferredUpdates(() =>
      this.setState(state => ({ seconds: (state.seconds % 10) + 1 }))
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    const seconds = this.state.seconds;
    const elapsed = this.props.elapsed;
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
    return (
      <div style={{ ...containerStyle, transform }}>
        <div>
          <SierpinskiTriangle x={0} y={0} s={1000}>
            {this.state.seconds}
          </SierpinskiTriangle>
        </div>
      </div>
    );
  }
}

var start = new Date().getTime();
function update() {
  ReactDOM.render(
    <ExampleApplication elapsed={new Date().getTime() - start} />,
    node
  );
  requestAnimationFrame(update);
}
requestAnimationFrame(update);


/*
class Counter extends React.Component {
  state = { value: 0 };
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }
  tick() {
    this.setState(({ value }) => ({ value: value + 1 }))
  }
  render() {
    return (
      <tr>
        <td>{this.state.value}</td>
        {this.state.value % 2 === 0 && <td>is even!</td>}
      </tr>
    );
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
*/