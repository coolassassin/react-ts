import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './toggle.css';

/**
    Complete the Toggle component.
    Let the flag be stored in the internal state,
    and when it changes, pass it outside through onChange.
 */

type ToggleProps = {
  onChange(value: boolean): void;
};

type ToggleState = {};

class Toggle extends React.Component<ToggleProps, ToggleState> {
  // constructor(props: ToggleProps) {
  // }

  render() {
    const checked = true;
    return (
      <span className={'container' + (checked ? ' isChecked' : '')} onClick={this.handleClick}>
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {};
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Use smart components
  </div>
);

/**
    Hints:
    - The initial state of the component is stored in `this.state` and is typically initialized in the constructor.
    - Don't forget to add `super(props)` as the first line of the constructor to call the base type's constructor.
    - `this.setState({property: value})` updates part of the state and triggers a rerender.
 */
