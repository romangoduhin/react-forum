import { useState, useEffect } from 'react';

export default (key, initialValue = '') => { // this custom hook to work with localStorage
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || initialValue, // get localStorage item
  );

  useEffect(() => { // set localStorage item
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};
