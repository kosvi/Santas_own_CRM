import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Person } from '../../types';

interface closeMethod {
  (): void
}

export const DisplayPerson = ({ person, closeResultMethod }: { person: Person, closeResultMethod: closeMethod }) => {

  const navigate = useNavigate();

  const openPerson = (id: number) => {
    closeResultMethod();
    navigate(`/people/${id}`);
  };

  return (
    <div>
      {/* <Link to={`/people/${person.id}`}>{person.name} / {person.address}</Link> */}
      <span onClick={() => openPerson(person.id)}>{person.name} / {person.address}</span>
    </div>
  );
};
