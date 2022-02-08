import React, { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

export const SearchForm = () => {

  const [searchString, setSearchString] = useState<string>('');
  const debounceString = useDebounce<string>(searchString, 1000);

  const updateSearchString = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
  };

  return (
    <div>
      <input type="text" onChange={updateSearchString} /> {debounceString}
    </div>
  );
};