import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import usePeople from '../../hooks/usePeople';
import { peopleSelector } from '../../store/people';
import { FullPerson } from '../../types';
import { parseNumber } from '../../utils/validators';
import moment from 'moment';

export const DisplayPerson = ({ idString }: { idString: string }) => {

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
      <Link to='/people'>back</Link>
      <h3>{person.name}</h3>
      <div>Address: {person.address}</div>
      <div>Birthday: {moment(person.birthdate).format('DD.MM.YYYY')}</div>
      <div>Age: {moment().diff(person.birthdate, 'years')}</div>
      <div>
        <h4>Wishes</h4>
        {person.wishes.map(w => {
          return (
            <div key={w.id} className="PersonListItem">
              <b>{w.item.name}</b> <br />
              Description: {w.description}
            </div>
          );
        })}
      </div>
      <div>
        <h4>Entries</h4>
        <b>Total</b> {person.entries.reduce((previous, current) => {
          return previous + current.niceness;
        }, 0)}
        {person.entries.map(e => {
          return (
            <div key={e.id} className="PersonListItem">
              <b>niceness</b> {e.niceness}<br />
              {e.description}
            </div>
          );
        })
        }
      </div>
    </div>
  );

};

