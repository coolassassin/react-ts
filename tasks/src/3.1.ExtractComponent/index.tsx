import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    1. **Refactor `renderPost` into a functional component named `Post`**:

    2. **TypeScript checks the attributes being passed.**
    - We have strings as attributes everywhere. Make `author` and `time` properties required and `message` optional.

    3. **Ensure that `author` defaults to "<Unknown author>" if not provided.**
    - Verify that it works by removing the author's name.

    4. **Refactor the component so that `message` is passed via `props.children`.**
 */
type Post = {
  author: string;
  time: string;
  message: string;
};

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

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <div className="posts">
      {renderPost({
        author: 'Sweet girl',
        time: '3 hours ago',
        message: 'Can be used for baking cheesecakes :)'
      })}
    </div>
  </div>
);

/**
    Here are the translations of the provided hints:

    **Hints for 1:**
    - `{renderMyComponent({a: 1, b: 'some'})}` → `<MyComponent a={1} b="some">`
    - The first argument of a component function is usually called `props` or destructured.

    **Hints for 2:**
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
    }

    **Hints for 3:**
    - In the `Props` type, make all keys optional for which default values are expected.
    type MyComponentProps = {
        valueWithDefault?: string;
    }
    - Destructuring a function parameter allows specifying default values.
    function MyComponent({valueWithDefault = 'default'}: MyComponentProps)

    **Hints for 4:**
    - Children are the nested nodes within a tag.
    Example with one child: `<MyComponent>Value</MyComponent>`
    - Children are accessed in `props` as an array via `props.children`.
    - To type Props, add an optional `children` property with a `ReactNode` type.
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
        children?: ReactNode;
    }
 */
