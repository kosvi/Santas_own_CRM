import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FullPerson } from '../../types';

export const PersonRow = ({ person }: { person: FullPerson }) => {

  const navigate = useNavigate();

  const openPerson = () => {
    navigate(`/people/${person.id}`);
  };

  return (
    <tr className="PersonRow" onClick={openPerson}>
      <td>{person.name}</td>
      <td>{person.birthdate}</td>
      <td>{person.address}</td>
      <td>{person.entries.length > 0 ? person.entries.length : '-'}</td>
      <td>{person.wishes.length > 0 ? person.wishes.length : '-'}</td>
    </tr>
  );
};

