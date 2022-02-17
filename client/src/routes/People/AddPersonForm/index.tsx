import React from 'react';
import usePeople from '../../../hooks/usePeople';
import { CreateForm, FormValues } from './CreateForm';

export const AddPersonForm = () => {

  const { addPerson } = usePeople();

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    const { name, birthdate, address } = values;
    await addPerson(name, birthdate, address);
    return true;
  };

  return (
    <div>
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );
};