import React from 'react';
import style from './ErrorMessages.module.scss';

function ErrorMessages({ error }) {
  const errorMessages = Object.keys(error).map((errName) => `${errName} ${error[errName]}`);
  return (
    <ul className={style.errorMessages}>
      {errorMessages.map((message) => <li key={message}>{message}</li>)}
    </ul>
  );
}
export default ErrorMessages;
