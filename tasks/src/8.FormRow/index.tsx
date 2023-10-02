import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Input, { InputProps } from './Input';
import Toggle, { ToggleProps } from './Toggle';

/**
  InputFormRow is cool, but it only supports regular inputs. In the new form, I needed to support a custom Toggle, so I had to create ToggleFormRow. There's a lot of duplicated code, and that's sad :(

  Higher Order Components (HOC) — functions of the form Component → Component — can come to the rescue. Using HOC, you can create new enhanced components from regular ones:
  const EnhancedComponent = enhance(JustComponent); // enhance is an HOC

  HOC cannot be used with elements, such as input, so it has already been wrapped in the Input component.

  1. Write an HOC createFormRow that can be used as follows:
  const InputFormRow = createFormRow(Input);
  const ToggleFormRow = createFormRow(Toggle);
  Use the HOC from enhance.js as an example.

  2. Use createFormRow, removing the old implementations of InputFormRow and ToggleFormRow.

  3. Open React in Developer Tools in Chrome and make sure that, thanks to the displayName assignment, the resulting components are named nicely. If you don't see the React tab in Developer Tools, install the React Developer Tools extension for Chrome.

  4. Make it so that when the form is opened, the focus is set to the first form field. All the necessary code in Form is already written:
  - firstRowRef is set to the first row of the form;
  - when the form is opened, firstRowRef.current.focus() is called.
  However, this.firstRowRef.current does not point to an input or Toggle, which has the focus method. The HOC should forward the ref to WrappedComponent.

  NOTE: Implementing the focus method in the HOC is a bad idea. If you follow this approach, you would need to add all the methods you want to use "externally" to all possible WrappedComponents that will be used with the HOC.
*/

const Form = () => {
  const [opened, setOpened] = React.useState(false);
  const firstRowRef = React.useRef<Input>();

  React.useEffect(() => {
    setFocusOnOpen();
  });

  const renderOpenButton = () => {
    return (
      <div className="openContainer">
        <input type="button" className="actionButton" value="Показать форму" onClick={handleOpen} />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="form">
        <form>
          <InputFormRow label="Фамилия" type="text" />
          <InputFormRow label="Имя" type="text" />
          <InputFormRow label="Отчество" type="text" />
          <ToggleFormRow label="Вегетарианец" />
        </form>
        <div className="saveContainer">
          <input type="submit" className="actionButton" value="Сохранить" onClick={handleSave} />
        </div>
      </div>
    );
  };

  const handleOpen = () => {
    setOpened(true);
  };

  const handleSave = () => {
    setOpened(false);
  };

  const setFocusOnOpen = () => {
    if (opened) {
      // Проверка перед вызовом нужна,
      // пока firstRowRef не устанавливается корректно.
      firstRowRef?.current?.focus?.();
    }
  };

  return (
    <div>
      {!opened && renderOpenButton()}
      {opened && renderForm()}
    </div>
  );
};

type FormRowProps = { label: string };

const InputFormRow = ({ label, ...rest }: FormRowProps & InputProps) => {
  return (
    <div className="row">
      <div className="label">{label}</div>
      <Input {...rest} />
    </div>
  );
};

const ToggleFormRow = ({ label, ...rest }: FormRowProps & ToggleProps) => {
  return (
    <div className="row">
      <div className="label">{label}</div>
      <Toggle {...rest} />
    </div>
  );
};

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Form />);

/**
  Hints for step 4:

  - You cannot pass a variable for the ref from an external component to an internal one through the ref attribute because it is reserved. You will have to use another attribute, for example, forwardedRef.

  - To make React pass the ref, you will have to add the following code to the end of the HOC:

  React.forwardRef((props: React.ComponentProps<typeof FormRow>, ref) => (
  <FormRow {...props} forwardedRef={ref} />
  ))

  It is assumed that the wrapping component is called FormRow. Note that `React.forwardRef` is almost an HOC, and `forward` is almost a function component. More about ForwardedRef is written in the documentation: https://reactjs.org/docs/forwarding-refs.html

  - When the ref is already in a separate attribute, it is not difficult to use:
  <WrappedComponent ref={forwardedRef} {...rest} />
 */
