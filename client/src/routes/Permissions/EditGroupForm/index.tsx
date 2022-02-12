import React from 'react';
import { Functionality } from '../../../types';
import { CreateForm } from './CreateForm';

export const EditGroupForm = ({ permission }: { permission: Functionality }) => {

  const handleSubmit = async (): Promise<boolean> => {
    console.log('handled!');
    return true;
  };

  return (
    <div>
      <CreateForm permission={permission} handleSubmit={handleSubmit} />
    </div>
  );
};