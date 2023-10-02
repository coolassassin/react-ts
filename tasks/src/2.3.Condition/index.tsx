import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
     1. Without creating additional methods:
         - Modify `renderPosts` to return:
         - A `div` with the class `emptyPosts` and text "No responses" if `posts` is empty: `<div className="emptyPosts">No responses</div>`
         - A `div` with the class `singlePost` and text "Single response" if `posts` contains exactly 1 element: `<div className="singlePost">Single response</div>`
         - A `div` with the class `posts` in all other cases: `<div className="posts">Responses count: {posts.length}</div>`

     2. If the `name` of the lot is empty or undefined, display "<Unknown item>" instead.

     3. If the `description` of the lot is empty or undefined, the `lotDescription` tag should be absent.

     4. If the lot has no tags, the `lotTags` `div` should be absent.
 */

function renderPosts(posts: string[]) {
  //<div className="emptyPosts">No responses</div>
  //<div className="singlePost">Single response</div>
  return <div className="posts">Responses count: {posts.length}</div>;
}

function renderLot(name: string, description: string | undefined, tags: string[]) {
  return (
    <div className="lot">
      <div className="lotName">{name}</div>
      <div className="lotDescription">{description}</div>
      {renderTags(tags)}
    </div>
  );
}

function renderTags(tags: string[]) {
  const content = tags.join(', ');
  return <div className="lotTags">{content}</div>;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div>
    <div className="page">
      {renderLot('', 'red, beautiful, yours!', [])}
      {renderPosts([])}
    </div>
    <div className="page">
      {renderLot('Cabbage Pie', undefined, ['#fresh', '#handmade'])}
      {renderPosts(['Exactly one response here'])}
    </div>
    <div className="page">
      {renderLot('', '', ['#big', '#bright'])}
      {renderPosts(['Great!', 'I want more!', 'Terrible'])}
    </div>
  </div>
);
