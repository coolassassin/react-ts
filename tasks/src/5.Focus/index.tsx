import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    InputFormRow allows you to create forms even faster than before! The amount of code duplication is reduced, and thanks to it, you can add new features to all form fields at once.

    Make it so that clicking anywhere on InputFormRow transfers focus to the input field.

    Note:
    - Ensure that all props, except those needed, are elegantly passed through to the input.
 */

type InputFormRowProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

class InputFormRow extends React.Component<InputFormRowProps> {
  constructor(props: InputFormRowProps) {
    super(props);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="row" onClick={this.handleClick}>
        <div className="label">{label}</div>
        <input {...rest} />
      </div>
    );
  }

  handleClick = () => {};
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="form">
    <form>
      <InputFormRow label="Surname" type="text" defaultValue="Ivanov" />
      <InputFormRow label="Name" type="text" defaultValue="Ivan" />
      <InputFormRow label="Patronymic" type="text" defaultValue="Ivanovich" />
      <InputFormRow label="Vegetarian" type="checkbox" defaultChecked />
    </form>
    <div className="saveContainer">
      <input type="submit" className="actionButton" value="Сохранить" />
    </div>
  </div>
);

/**
    Tips:
        - The input element has a focus() method, but you need a reference.
        - There are two current ways to get a reference:
        - <div ref={this.myRef}/>, but you need to create this.myRef = React.createRef() in advance;
    Type for such a ref: React.RefObject<HTMLInputElement>
    - <div ref={r => this.myRef = r}/> and then, during render, the this.myRef property will contain the reference.
    Type for this type of ref for input: HTMLInputElement | null

    Depending on the chosen method, myRef will be slightly different objects.
    - To hint to the user that they can click on the row and something will happen, add the pointer class to the div with the CSS class "row."
 */
