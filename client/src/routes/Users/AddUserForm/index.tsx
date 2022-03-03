import React from 'react';
import useUsers from '../../../hooks/useUsers';
import { CreateForm, FormValues } from './CreateForm';

export const AddUserForm = () => {

  const { addUser } = useUsers();

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    const { name, username, password } = values;
    await addUser({ name, username, password });
    return true;
  };

  return (
    <div id="AddUserForm">
      <h3>Add new user</h3>
      <CreateForm handleSubmit={handleSubmit} />
    </div>
  );
};
