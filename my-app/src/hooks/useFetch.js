import axios from 'axios';
import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default (url) => { // this custom hook do fetching
  const baseUrl = 'https://conduit.productionready.io/api';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      headers: { // if user is logged in - add token info, if user registers - add ''
        authorization: token ? `Token ${token}` : '',
      },
    };

    axios(baseUrl + url, requestOptions).then((res) => {
      setIsLoading(false);
      setResponse(res.data);
    }).catch((error) => {
      setIsLoading(false);
      setError(error.response.data);
    });
  }, [isLoading]);

  return [{ response, error, isLoading }, doFetch];
};
