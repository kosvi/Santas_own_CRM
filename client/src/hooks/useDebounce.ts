import { useEffect, useState } from 'react';

/*
 * Worked hard to get this hook to work, but had to google help
 * Gotta give credit for the original source:
 *   https://usehooks.com/useDebounce/
 */

function useDebounce<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
