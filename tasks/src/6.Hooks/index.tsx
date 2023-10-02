import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
  Make all classes in the application replaced with functional components; use Hooks for this.

  You can import the necessary hooks like this:
  import React, { useState, useRef, useEffect } from "react";

  List of hooks that might be useful: `useState`, `useRef`, `useEffect`.
 */

type AppState = {
  blockIds: number[];
};

class App extends React.Component<{}, AppState> {
  private lastBlockId = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      blockIds: []
    };
  }

  addNew = () => {
    this.lastBlockId++;
    this.setState({
      blockIds: [...this.state.blockIds, this.lastBlockId]
    });
  };

  removeLast = () => {
    this.setState({
      blockIds: this.state.blockIds.slice(0, this.state.blockIds.length - 1)
    });
  };

  render() {
    return (
      <div className="page">
        <div className="controlPanel">
          <button type="button" onClick={this.removeLast} className="actionButton">
            -
          </button>
          <button type="button" onClick={this.addNew} className="actionButton">
            +
          </button>
        </div>
        <div className="container">
          {this.state.blockIds.map(blockId => (
            <CounterBlock key={blockId} />
          ))}
        </div>
      </div>
    );
  }
}

type CounterBlockProps = {
  value: number;
};

class CounterBlock extends React.Component<{}, CounterBlockProps> {
  private timer?: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      this.setState({ value: this.state.value + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return <div className="block">{this.state.value}</div>;
  }
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<App />);
