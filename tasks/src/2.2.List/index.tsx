import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    Here are the translations of the provided instructions:

    1. Analyze manual array iterations in the markup.
    Use `map` without loops for posts, and use a `for` loop without `map` for authors.

    2. Check for errors in Chrome DevTools: React requires the presence of `key` attributes.
    Add an `id` field to each post and assign a unique string identifier to it.
    Use the `id` as the `key` value in the main post tag and the main author tag.
 */

type Post = {
  author: string;
  time: string;
  message: string;
};

const posts: Post[] = [
  {
    author: 'Парень не промах',
    time: '2 часа назад',
    message: 'Попробую с удовольствием ;)'
  },
  {
    author: 'Милая девушка',
    time: '3 часа назад',
    message: 'Можно использовать для выпекания чизкейков :)'
  },
  {
    author: 'Скупец',
    time: 'вчера',
    message: 'Цену-то загнули!'
  }
];

function renderPost(post: Post) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{post.author}</span>
        <br />
        <span className="postTime">{post.time}</span>
      </div>
      <div className="postMessage">{post.message}</div>
    </div>
  );
}

function renderAuthors(posts: Post[]) {
  return (
    <div className="authors">
      <span>{posts[0].author}</span>
      <span>{posts[1].author}</span>
      <span>{posts[2].author}</span>
    </div>
  );
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <div className="posts">
      {renderPost(posts[0])}
      {renderPost(posts[1])}
      {renderPost(posts[2])}
    </div>
    {renderAuthors(posts)}
  </div>
);

/**
    Here are the translations of the provided hints:

    - Displaying an array as another array is done like this:
    `const values = items.map(item => item.field);`
    - You can add values to the end of arrays using the `push` method:
        const numbers = [];
        numbers.push(1);

    - Choose the appropriate `for` loop:
    - `for (let i = 0; i < items.length; i++) {}`
    - `for (let key in items) {}`
    - `for (const item of items) {}`
 */
