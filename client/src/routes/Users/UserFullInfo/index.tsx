import React, { useEffect, useRef, useState } from 'react';
import usePermission from '../../../hooks/usePermission';
import useUsers from '../../../hooks/useUsers';
import { UserWithGroups } from '../../../types';
import { parseNumber } from '../../../utils/validators';
import { AdminButtons } from './AdminButtons';

export const UserFullInfo = ({ id }: { id: string }) => {

  const { updateUser } = useUsers();
  const [user, setUser] = useState<UserWithGroups | undefined>(undefined);
  const { allowWriteAccess } = usePermission();

  // this is set to false on unmount -> no state updates to cause memory leaks
  const allowStateUpdates = useRef(true);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchId = parseNumber(id);
      if (fetchId) {
        const fetchedUser = await updateUser(fetchId);
        // don't update state if component is no longer mounted (don't cause memory leak!)
        if (allowStateUpdates) {
          setUser(fetchedUser);
        }
      }
    };
    fetchUser();
    // cleanup function -> no longer allow state updates from async code
    return () => {
      allowStateUpdates.current = false;
    };
  }, [id]);

  if (!user) {
    return (
      <div>Loading user...</div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {allowWriteAccess('users') && <AdminButtons user={user} />}
    </div>
  );
};