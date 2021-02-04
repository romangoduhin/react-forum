import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Authentication.module.scss';
import useFetch from '../../hooks/useFetch';

function Authentication(props) {
  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up ';
  const descriptionLink = isLogin ? '/signup' : 'login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  const handleSubmit = () => {
    const user = isLogin ? { email, password } : { username, email, password };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <h1>{pageTitle}</h1>
        <Link to={descriptionLink}>{descriptionText}</Link>
        <div className={style.inputWrapper}>
          {!isLogin && (
            <label htmlFor="username" className={style.label}>
              Username

              <input
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
          )}

          <label htmlFor="email" className={style.label}>
            Email

            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label htmlFor="password" className={style.label}>
            Password

            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <button type="button" onClick={handleSubmit} disabled={isLoading}>{pageTitle}</button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
