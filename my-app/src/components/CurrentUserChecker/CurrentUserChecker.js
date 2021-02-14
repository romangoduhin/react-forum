import React, { useEffect, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useLocalStorage from '../../hooks/useLocalStorage';

function CurrentUserChecker({ children }) { // this component checks if the user is logged in
  const [token] = useLocalStorage('token');
  const [{ response }, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext);

  useEffect(() => {
    if (!token) { // if user is not logged in
      dispatch({ type: 'SET_UNAUTHORIZED' });
      return;
    }

    doFetch(); // if the user is logged in , send request to get current user info
    dispatch({ type: 'LOADING' });
  }, [token, doFetch, dispatch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user }); // if the user is logged in, set current user info from response
  }, [response, dispatch]);

  return children;
}

export default CurrentUserChecker;
