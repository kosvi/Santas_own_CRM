import React, { useEffect } from 'react';
import usePermission from '../../hooks/usePermission';
import useUsers from '../../hooks/useUsers';
import { AddUserForm } from './AddUserForm';
import { UserGrid } from './UserGrid';

export const Users = () => {

  const { allowReadAccess, allowWriteAccess } = usePermission();
  const { fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!allowReadAccess('users')) {
    return (
      <div>
        Access denied!
      </div>
    );
  }

  return (
    <div>
      {allowWriteAccess('users') && <AddUserForm />}
      <button onClick={() => fetchUsers(true)}>reload users</button>
      <UserGrid />
    </div>
  );
};