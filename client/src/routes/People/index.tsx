import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import usePeople from '../../hooks/usePeople';
import { peopleSelector } from '../../store/people';
import { Person } from '../../types';
import { parseNumber } from '../../utils/validators';
import { AddPersonForm } from './AddPersonForm';
import DisplayPerson from './DisplayPerson';

export const People = () => {

  const { id } = useParams<'id'>();
  const [name, setName] = useState<string>('');
  const [people, setPeople] = useState<Array<Person>>([]);
  const { findPeopleByName } = usePeople();

  const fetchPeople = async () => {
    const fetchResult = await findPeopleByName(name);
    setPeople(fetchResult);
  };

  if (!id) {
    return (
      <div>
        Hello People!
        <div>
          <AddPersonForm />
        </div>
        <div>
          <input type='text' name='name' value={name} onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)} />
        </div>
        <div>
          <button onClick={fetchPeople}>find</button>
        </div>
        <div>
          {people.map(p => <div key={p.id}>{p.name}</div>)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <DisplayPerson idString={id} />
    </div>
  );
};