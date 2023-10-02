import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
 * Highlight the method for rendering a lot (renderLot), the method for rendering a post (renderPost), and use them.
 */

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <div className="lot">
      <div className="lotName">Форма для выпекания</div>
      <div className="lotDescription">Идеальна для приготовления десертов!</div>
    </div>
    <div className="posts">
      <div className="post">
        <div className="postHeader">
          <span className="postAuthor">Парень не промах</span>
          <br />
          <span className="postTime">2 часа назад</span>
        </div>
        <div className="postMessage">Попробую с удовольствием ;)</div>
      </div>
      <div className="post">
        <div className="postHeader">
          <span className="postAuthor">Милая девушка</span>
          <br />
          <span className="postTime">3 часа назад</span>
        </div>
        <div className="postMessage">Можно использовать для выпекания чизкейков :)</div>
      </div>
    </div>
  </div>
);

/**
Hints
  - To insert some value from JavaScript into your markup, use curly braces:
  `<div className={'star' + ' ' + 'person'}>{surname + ' ' + name}</div>`
  - Treat the markup tag as a literal describing the value of some data type.
  - You can put this value into a variable or return it:
  `const label = <span>Label</span>;`
  - For aesthetic reasons, the returned tag is often wrapped in parentheses:
     return (
      <span>Label</span>
     );
  - Use code auto-formatting. For example, in Visual Studio Code, it is triggered by Shift+Alt+F.
 */
