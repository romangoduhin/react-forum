import axios from 'axios';
import { useState, useEffect } from 'react';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    console.log('effect');
    if (!isLoading) {
      return;
    }
    console.log('AXIOS');
    axios(baseUrl + url, options).then((res) => {
      console.log('res', res);
      setIsLoading(false);
      setResponse(res.data);
    }).catch((error) => {
      console.log('error', error);
      setIsLoading(false);
      setError(error.response.data);
    });
  }, [isLoading]);

  return [{ response, error, isLoading }, doFetch];
};
