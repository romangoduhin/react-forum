import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default (url) => { // this custom hook do fetching
  const baseUrl = 'https://conduit.productionready.io/api';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => { // return a memoized version of the function
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipResponseAfterUnmount = false;

    if (!isLoading) {
      return null;
    }

    const requestOptions = {
      ...options,
      headers: {
        authorization: token ? `Token ${token}` : '',
      },
    };

    axios(baseUrl + url, requestOptions).then((res) => {
      if (!skipResponseAfterUnmount) {
        setIsLoading(false);
        setResponse(res.data);
      }
    }).catch((error) => {
      if (!skipResponseAfterUnmount) {
        setIsLoading(false);
        setError(error.response.data);
      }
    });
    return () => {
      skipResponseAfterUnmount = true;
    };
  }, [isLoading, options, token, url]);

  return [{ response, error, isLoading }, doFetch];
};
