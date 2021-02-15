import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import style from './Authentication.module.scss';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ErrorMessages from '../../components/ErrorMessages';
import reactumLogo from '../../assets/images/reactumLogo.png';

function Authentication(props) {
  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up ';
  const descriptionLink = isLogin ? '/signup' : 'login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token');
  const [, dispatch] = useContext(CurrentUserContext);

  const handleSubmit = () => {
    const user = isLogin ? { email, password } : { username, email, password };
    doFetch({ // send request options to register or login user
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token); // when we get response we set token to localStorage
    setIsSuccessfulSubmit(true);
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user }); // when we get response after registration we set user info
  }, [response, setToken, dispatch]);

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <div className={style.titleWrapper}>
          <Link className={style.title} to="/">
            <img src={reactumLogo} alt="reactumLogo" />
          </Link>
          {error && <ErrorMessages error={error.errors} />}
        </div>

        <form className={style.inputWrapper}>
          {!isLogin && (
            <label htmlFor="username" className={style.label}>
              Username

              <input
                type="text"
                id="username"
                placeholder="username"
                autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </form>

        <button
          className={style.submitButton}
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {pageTitle}
        </button>
      </div>

      <Link className={style.link} to={descriptionLink}>{descriptionText}</Link>
    </div>
  );
}

export default Authentication;
