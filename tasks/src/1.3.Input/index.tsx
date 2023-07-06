import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    Сделай так, чтобы в переменной userName сохранялось введенное пользователем значение.
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
    Подсказки:
    - Chrome DevTools содержит прекрасный отладчик. Открывается через Ctrl+Shift+I.
    - Инструкция debugger останавливает отладчик, если открыты DevTools.
    - Посмотри, что приходит первым аргументом в обработчик onChange.
    - onBlur вызывается при потере фокуса.
      Фокус - это куда будет осуществляться ввод с клавиатуры.
      Часто элементы с фокусом подсвечивают.
 */
