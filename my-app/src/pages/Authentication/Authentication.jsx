import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import style from './Authentication.module.scss';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../contexts/currentUser';
import ErrorMessages from '../../components/ErrorMessages';

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
  const [token, setToken] = useLocalStorage('token');
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  const handleSubmit = () => {
    const user = isLogin ? { email, password } : { username, email, password };
    doFetch({
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

    setToken(response.user.token);
    setIsSuccessfulSubmit(true);
    setCurrentUser((state) => ({
      ...state,
      isLoading: false,
      isLogged: true,
      currentUser: response.user,
    }));
  }, [response, isSuccessfulSubmit, currentUser]);

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }
  return (
    <div className={style.wrapper}>
      <div className={style.authBlock}>
        <h1>{pageTitle}</h1>
        <Link to={descriptionLink}>{descriptionText}</Link>
        <form className={style.inputWrapper}>
          {error && <ErrorMessages error={error.errors} />}
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
        </form>
      </div>
    </div>
  );
}

export default Authentication;
