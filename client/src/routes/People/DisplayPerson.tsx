import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import usePeople from '../../hooks/usePeople';
import { peopleSelector } from '../../store/people';
import { FullPerson } from '../../types';
import { parseNumber } from '../../utils/validators';
import moment from 'moment';
import usePermission from '../../hooks/usePermission';
import { AddEntry } from './AddEntry';

export const DisplayPerson = ({ idString }: { idString: string }) => {

  const { people } = useSelector(peopleSelector);
  const [person, setPerson] = useState<FullPerson>();
  const { allowWriteAccess } = usePermission();
  const { findPersonById } = usePeople();
  const mountedRef = useRef(true);

  // let's fetch the person to be displayed from 'people' to 'person'
  // do this everytime the ID changes or people gets updated
  useEffect(() => {
    const id = parseNumber(idString);
    if (!id) {
      return;
    }
    if (people[id]) {
      setPerson(people[id]);
    }
  }, [idString, people]);

  // This is basically the same as before, but here
  // we make API-call every time the ID is updated just to make sure
  // we have the latest version of the person in case
  // another elf has made entries, added wishes or possibly even updated name/address
  const updatePerson = useCallback(async () => {
    const id = parseNumber(idString);
    if (!id) {
      return;
    }
    const updatedPerson = await findPersonById(id);
    if (!mountedRef.current) {
      return;
    }
    setPerson(updatedPerson);
  }, [mountedRef]);

  useEffect(() => {
    updatePerson();
    return () => {
      mountedRef.current = false;
    };
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
        {allowWriteAccess('entries') && <AddEntry id={person.id} />}
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

