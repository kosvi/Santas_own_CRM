import React from 'react';
import { FunctionalityWithPermission } from '../../../types';
import { CreateForm } from './CreateForm';

export const EditGroupForm = ({ permission }: { permission: FunctionalityWithPermission }) => {

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