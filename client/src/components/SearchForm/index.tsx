import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import usePeople from '../../hooks/usePeople';
import { DisplayPerson } from './DisplayPerson';
import { useSelector } from 'react-redux';
import { peopleSelector } from '../../store/people';

export const SearchForm = () => {

  const [searchString, setSearchString] = useState<string>('');
  const debounceString = useDebounce<string>(searchString, 1000);
  // const [people, setPeople] = useState<Array<Person>>([]);
  const { people } = useSelector(peopleSelector);
  const { findPeopleByName } = usePeople();
  const [displayResult, setDisplayResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeople = async () => {
      await findPeopleByName(debounceString);
    };
    fetchPeople();
  }, [debounceString]);

  const clearSearch = () => {
    setDisplayResult(false);
    setSearchString('');
  };

  const updateSearchString = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
    setDisplayResult(true);
  };

  return (
    <div id="searchForm">
      <label htmlFor="searchInput">People: </label>
      <input type="text" id="searchInput" data-testid="searchInput" value={searchString} onChange={updateSearchString} />
      {debounceString.length > 0 && displayResult &&
        <div id="searchResults" data-testid="searchResults">
          <span onClick={clearSearch}>clear results</span>
          {Object.values(people).map(p => {
            if (p.name.toLowerCase().includes(debounceString.toLowerCase())) {
              return (<DisplayPerson key={p.id} person={p} closeResultMethod={clearSearch} />);
            }
          })}
        </div>
      }
    </div>
  );
};
