import React, { useEffect, useRef, useState } from 'react';
import useUsers from '../../../hooks/useUsers';
import { UserWithGroups } from '../../../types';

export const AdminButtons = ({ user }: { user: UserWithGroups }) => {

  const { changeUserDisableStatus, changePassword } = useUsers();
  const [updating, setUpdating] = useState<boolean>(false);

  const allowStateUpdates = useRef(true);

  useEffect(() => {
    allowStateUpdates.current = true;
    return () => {
      allowStateUpdates.current = false;
    };
  });

  const updateDisableStatus = async () => {
    setUpdating(true);
    await changeUserDisableStatus(user.id, !user.disabled);
    if (allowStateUpdates.current) {
      setUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    setUpdating(true);
    await changePassword(user.id, 'foobar');
    if (allowStateUpdates.current) {
      setUpdating(false);
    }
  };

  if (updating) {
    return (
      <div>
        <h3>Updating...</h3>
      </div>
    );
  }

  return (
    <div>
      Account is {user.disabled ? 'disabled' : 'enabled'}
      <button onClick={() => updateDisableStatus()}>{user.disabled ? 'enable' : 'disable'}</button>
      <button onClick={() => handleChangePassword()}>update password</button>
    </div>
  );
};