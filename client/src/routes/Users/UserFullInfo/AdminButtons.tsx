import React, { useEffect, useRef, useState } from 'react';
import useUsers from '../../../hooks/useUsers';
import { UserWithGroups } from '../../../types';

export const AdminButtons = ({ user }: { user: UserWithGroups }) => {

  const { changeUserDisableStatus } = useUsers();
  const [updating, setUpdating] = useState<boolean>(false);

  const allowStateUpdates = useRef(true);

  console.log('allowStateUpdates', allowStateUpdates);

  useEffect(() => {
    allowStateUpdates.current = true;
    return () => {
      console.log('component unmounted?');
      allowStateUpdates.current = false;
      console.log('allowStateUpdates:', allowStateUpdates);
    };
  });

  const updateDisableStatus = async () => {
    setUpdating(true);
    await changeUserDisableStatus(user.id, !user.disabled);
    if (allowStateUpdates.current) {
      console.log('try to update state');
      console.log('allowStateUpdates:', allowStateUpdates);
      setUpdating(false);
    }
  };

  return (
    <div>
      {updating ? <h3>Updating...</h3> : <h3>Done!</h3>}
      Account is {user.disabled ? 'disabled' : 'enabled'}
      <button onClick={() => updateDisableStatus()}>{user.disabled ? 'enable' : 'disable'}</button>
    </div>
  );
};