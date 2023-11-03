import { useState, useEffect } from "react";

/** Custom hook to manage local storage insertions, updates, and removals */
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
