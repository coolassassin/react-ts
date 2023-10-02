import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
 Finish the currency converter.
 - If the user enters a value in rubles, the amount in euros is updated according to the exchange rate.
 - If the user enters a value in euros, the amount in rubles is updated according to the exchange rate.
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Currency converter</h2>
          <div>
            <span>&#8381;</span>
            <Money />
            &mdash;
            <Money />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
}

type MoneyProps = {};

type MoneyState = {
  value: number;
};

class Money extends React.Component<MoneyProps, MoneyState> {
  constructor(props: MoneyProps) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChangeValue} />;
  }

  handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = extractNumberString(event.target.value);
    this.setState({ value });
  };
}

function extractNumberString(value: string): number {
  const str = value.replace(/^0+/g, '').replace(/[^.0-9]/g, '');
  const parts = str.split('.');
  return Number(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str);
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<MoneyConverter />);

/**
 Hints:
 - Currently, each Money component stores its own value in its internal state. To make the converter work, you need to be able to update the value from the outside, so you should get it from props.
 - Conversely, in MoneyConverter, you need to create state that will store values in both currencies. This way, you'll be implementing the "Lift State Up" pattern.
 - Note that the Money component no longer contains state and can be refactored into a functional component.
 */
