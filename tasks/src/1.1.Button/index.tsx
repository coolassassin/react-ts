import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    Write a button click handler.
    When clicked, it should display a dialog box with the message "Sent."
 */

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="root">
    <div className="form">
      <div style={{ marginBottom: '10px' }}>Press "Send"</div>
      <input type="button" className="button" value="Send" />
    </div>
  </div>
);

/**
     Hints:

     - alert(msg) creates a simple dialog box with the message msg.
     - React components corresponding to HTML support attributes like onClick, onChange, etc. You can pass an event handler function to them.
     - Arrow functions, like (x, y) => { return x + y; }, are a "non-performant" but quick way to write event handlers.
 */
