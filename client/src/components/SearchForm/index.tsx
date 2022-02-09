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

  const updateSearchString = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
  };

  return (
    <div>
      <input type="text" onChange={updateSearchString} /> {debounceString}
      {people.map(p => <DisplayPerson key={p.id} person={p} />)}
    </div>
  );
};
