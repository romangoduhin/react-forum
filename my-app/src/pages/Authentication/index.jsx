import React, { useState } from 'react';
import style from './index.module.scss';
import useFetch from '../../hooks/useFetch';

function Authentication() {
  console.log('render');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ response, error, isLoading }, doFetch] = useFetch('/users/login');

  const handleSubmit = () => {
    doFetch({
      method: 'post',
      data: {
        user: {
          email: 'test@gmail.com',
          password: 'test123',
        },
      },
    });
    console.log('submit');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <div className={style.inputWrapper}>
          <label htmlFor="email" className={style.label}>
            Username

            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </label>

          <label htmlFor="password" className={style.label}>
            Password

            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
          </label>

          <button type="button" onClick={handleSubmit} disabled={isLoading}>login</button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
