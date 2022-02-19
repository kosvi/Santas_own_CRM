import React from 'react';
import useEntry from '../../../hooks/useEntry';
import { NewEntry } from '../../../types';
import { CreateForm } from './CreateForm';
import { FormValues } from './CreateForm';

export const AddEntry = ({ id }: { id: number }) => {

  const { addEntry } = useEntry();

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    const newEntry: NewEntry = {
      personId: id,
      niceness: values.niceness,
      description: values.description
    };
    await addEntry(newEntry);
    return true;
  };

  return (
    <div>
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );
};