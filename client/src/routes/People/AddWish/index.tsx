import React from 'react';
import useWish from '../../../hooks/useWish';
import { NewWish } from '../../../types';
import { CreateForm, FormValues } from './CreateForm';

export const AddWish = ({ id }: { id: number }) => {

  const { addWish } = useWish();

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    const newWish: NewWish = {
      personId: id,
      itemName: values.itemName,
      description: values.description
    };
    await addWish(newWish);
    return true;
  };

  return (
    <div>
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );
};