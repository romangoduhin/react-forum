import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router';
import style from './Settings.module.scss';
import ErrorMessages from '../../components/ErrorMessages';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function Settings() {
  const apiUrl = '/user';
  const [currentUser, dispatch] = useContext(CurrentUserContext);
  const [, setToken] = useLocalStorage('token');
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  console.log('current', currentUser);

  const handleUpdate = () => {
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUser.currentUser,
          image,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setToken('');
    setIsLogoutSuccess(true);
  };

  useEffect(() => {
    if (!currentUser.currentUser) {
      return;
    }

    setImage(currentUser.currentUser.image);
    setUsername(currentUser.currentUser.username);
    setBio(currentUser.currentUser.bio);
    setEmail(currentUser.currentUser.email);
  }, [currentUser.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  if (isLogoutSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className={style.settingsWrapper}>
      <div className={style.settingsFormBanner}>
        <p>Settings</p>
      </div>

      <form className={style.formWrapper}>
        {(error && error.errors) && <ErrorMessages error={error.errors} />}
        <input
          type="text"
          id="profileImage"
          placeholder="profile image url"
          autoComplete="off"
          className={style.formInput}
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />

        <input
          type="text"
          id="username"
          placeholder="username"
          autoComplete="off"
          className={style.formInput}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <textarea
          id="bio"
          cols="30"
          rows="10"
          placeholder="Short bio about you"
          value={bio}
          className={style.formTextArea}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />

        <input
          type="text"
          id="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          className={style.formInput}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="text"
          id="password"
          placeholder="input password to accept changes or new password"
          autoComplete="off"
          value={password}
          className={style.formInput}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className={style.updateButton}
          type="button"
          disabled={isLoading}
          onClick={handleUpdate}
        >
          Update profile
        </button>

        <button
          className={style.deleteButton}
          type="button"
          disabled={isLoading}
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default Settings;
