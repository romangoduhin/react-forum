import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './index.module.scss';

function Authentication() {
  console.log('render');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = () => {
    setIsSubmit(true);
    console.log('submit');
  };

  useEffect(() => {
    console.log('effect');
    if (!isSubmit) {
      return;
    } // disabling the first request
    console.log('AXIOS');
    axios('https://conduit.productionready.io/api/users/login', {
      method: 'post',
      data: {
        user: {
          email: 'test@gmail.com',
          password: 'test123',
        },
      },
    }).then((res) => {
      console.log('res', res);
      setIsSubmit(false);
    }).catch((error) => {
      console.log('error', error);
      setIsSubmit(false);
    });
  }, [isSubmit]);

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

          <button type="button" onClick={handleSubmit} disabled={isSubmit}>login</button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
