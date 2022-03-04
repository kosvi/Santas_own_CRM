import React from 'react';
import useUsers from '../../../hooks/useUsers';
import { UserWithGroups } from '../../../types';

export const AdminButtons = ({ user }: { user: UserWithGroups }) => {

  const { changeUserDisableStatus } = useUsers();

  const updateDisableStatus = async () => {
    changeUserDisableStatus(user.id, !user.disabled);
  };

  return (
    <div>
      Account is {user.disabled ? 'disabled' : 'enabled'}
      <button onClick={() => updateDisableStatus()}>{user.disabled ? 'enable' : 'disable'}</button>
    </div>
  );
};