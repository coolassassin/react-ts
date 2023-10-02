import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    1. Complete the TimeDisplay so that it shows the current user's time and updates itself every second.
    2. Have a message written to the console with each time update:
    console.log('tick');
    3. Take care of releasing resources in case the element is removed.
    Ensure that if the component is hidden by a button, ticks will not be written to the console.
 */

type TimerState = {
  timeVisible: boolean;
};

class Timer extends React.Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);
    this.state = { timeVisible: true };
  }

  render() {
    const { timeVisible } = this.state;
    return (
      <div className="page">
        <input
          className="button"
          type="button"
          value={timeVisible ? 'Hide' : 'Show'}
          onClick={() => {
            this.setState({ timeVisible: !timeVisible });
          }}
        />
        {this.state.timeVisible && <TimeDisplay />}
      </div>
    );
  }
}

type TimeDisplayState = {
  localTime: Date;
};

class TimeDisplay extends React.Component<{}, TimeDisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      localTime: new Date()
    };
  }

  render() {
    return <div className="time">{this.state.localTime.toLocaleTimeString()}</div>;
  }
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Timer />);

/**
    Tips:
    - The window.setInterval function registers a handler that will be called no more frequently than the specified number of milliseconds. It is formatted as follows:
    const intervalId = window.setInterval(handler, intervalInMilliseconds);
    - You can pass intervalId to the clearInterval function to stop calling the handler:
    window.clearInterval(intervalId);
    - this.setState({property: value}) updates a part of the state and triggers a redraw.
    - componentDidMount is called immediately after the component is placed on the page. You can make data retrieval requests or subscribe to events here.
    - componentWillUnmount is called before removing the component. It is guaranteed to be called if the element "did mount." An excellent place to free up resources.
*/
