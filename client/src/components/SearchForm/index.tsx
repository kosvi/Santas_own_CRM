import React, { useState } from 'react';

export const SearchForm = () => {

  const [searchString, setSearchString] = useState<string>('');

  const updateSearchString = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
  };

  return (
    <div>
      <input type="text" onChange={updateSearchString} /> {searchString}
    </div>
  );
};