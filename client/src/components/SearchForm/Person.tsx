import React from 'react';
import { Person } from '../../types';

export const DisplayPerson = ({ person }: { person: Person }) => {
  return (
    <div>
      {person.name} / {person.address}
    </div>
  );
};
