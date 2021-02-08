import React, { useEffect, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function CurrentUserChecker({ children }) { // this component checks if the user is logged in
  const [token] = useLocalStorage('token');
  const [{ response }, doFetch] = useFetch('/user');
  const [, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    if (!token) { // if user is not logged in
      setCurrentUser((state) => ({
        ...state, isLogged: false,
      }));
      return;
    }

    doFetch(); // if the user is logged in , send request to get current user info
    setCurrentUser((state) => ({
      ...state, isLoading: true,
    }));
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurrentUser((state) => ({ // if the user is logged in, set current user info from response
      ...state,
      isLoading: false,
      isLogged: true,
      currentUser: response.user,
    }));
  }, [response]);

  return children;
}

export default CurrentUserChecker;
