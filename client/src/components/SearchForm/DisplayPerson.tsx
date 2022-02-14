import React from 'react';
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
      <span data-testid="display-person-click-name" onClick={() => openPerson(person.id)}>{person.name} / {person.address}</span>
    </div>
  );
};
