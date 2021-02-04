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
    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, options).then((res) => {
      setIsLoading(false);
      setResponse(res.data);
    }).catch((error) => {
      setIsLoading(false);
      setError(error.response.data);
    });
  }, [isLoading]);

  return [{ response, error, isLoading }, doFetch];
};
