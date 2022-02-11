import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { peopleService } from '../../services/peopleService';
// import { logger } from '../../utils/logger';
import { Person } from '../../types';
import { DisplayPerson } from './Person';

export const SearchForm = () => {

  const [searchString, setSearchString] = useState<string>('');
  const debounceString = useDebounce<string>(searchString, 1000);
  const [people, setPeople] = useState<Array<Person>>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleArray = await peopleService.findPeople(debounceString);
      setPeople(peopleArray);
    };
    fetchPeople();
  }, [debounceString]);

  const clearSearch = () => {
    setSearchString('');
    setPeople([]);
  };

  const updateSearchString = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
  };

  return (
    <div id="searchForm">
      <input type="text" value={searchString} onChange={updateSearchString} />
      {people.length > 0 &&
        <div id="searchResults">
          {people.map(p => <DisplayPerson key={p.id} person={p} closeResultMethod={clearSearch} />)}
        </div>
      }
    </div>
  );
};
