import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue = null) => {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
