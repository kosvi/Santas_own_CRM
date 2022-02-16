import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePeople from '../../hooks/usePeople';
import { peopleSelector } from '../../store/people';
import { FullPerson } from '../../types';
import { parseNumber } from '../../utils/validators';

const DisplayPerson = ({ idString }: { idString: string }) => {

  const { people } = useSelector(peopleSelector);
  const [person, setPerson] = useState<FullPerson>();
  const { findPersonById } = usePeople();

  useEffect(() => {
    const updatePerson = async () => {
      const id = parseNumber(idString);
      if (!id) {
        return;
      }
      const updatedPerson = await findPersonById(id);
      setPerson(updatedPerson);
    };
    updatePerson();
  }, [idString]);

  useEffect(() => {
    const id = parseNumber(idString);
    if (!id) {
      return;
    }
    if (people[id]) {
      setPerson(people[id]);
    }
  }, [idString]);

  if (!person) {
    return (
      <div>
        No person to display!
      </div>
    );
  }

  return (
    <div>
      {person.name}
      <div>
        {person.wishes.map(w => {
          return (
            <div key={w.id}>
              {w.description}
            </div>
          );
        })}
      </div>
    </div>
  );

};

export default DisplayPerson;