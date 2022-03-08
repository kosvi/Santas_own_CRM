import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';
import useUsers from '../../hooks/useUsers';
import { AddUserForm } from './AddUserForm';
import { UserFullInfo } from './UserFullInfo';
import { UserGrid } from './UserGrid';

export const Users = () => {

  const { allowReadAccess, allowWriteAccess } = usePermission();
  const { fetchUsers } = useUsers();
  const { id } = useParams<'id'>();

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

  if (id) {
    return <UserFullInfo id={id} />;
  }

  return (
    <div>
      {allowWriteAccess('users') && <AddUserForm />}
      <button onClick={() => fetchUsers(true)}>reload users</button>
      <UserGrid />
    </div>
  );
};