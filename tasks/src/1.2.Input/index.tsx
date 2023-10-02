import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
 * Make it so that the user's input is saved in the userName variable.
 */

let userName = 'По умолчанию';

let mydom = (
  <div className="root">
    <div className="form">
      <div style={{ paddingRight: '10px', display: 'inline-block' }}>
        <label htmlFor="name">Имя</label>
      </div>
      <input
        id="name"
        type="text"
        size={39}
        onChange={event => {
          const target = event.target;
          debugger;
        }}
        onBlur={() => alert(`userName: ${userName}`)}
      />
    </div>
  </div>
);

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(mydom);

/**
    Hints:

    - Chrome DevTools contains an excellent debugger, accessible through Ctrl+Shift+I.
    - The debugger statement stops the debugger if DevTools are open.
    - Check what comes as the first argument to the onChange handler.
    - onBlur is triggered when the element loses focus. Focus is where keyboard input will go. Often, elements with focus are highlighted.
 */
