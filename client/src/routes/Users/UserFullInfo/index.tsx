import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePermission from '../../../hooks/usePermission';
import useUsers from '../../../hooks/useUsers';
import { usersSelector } from '../../../store';
import { UserWithGroups } from '../../../types';
import { parseNumber } from '../../../utils/validators';
import { AdminButtons } from './AdminButtons';

export const UserFullInfo = ({ id }: { id: string }) => {

  const { users } = useSelector(usersSelector);
  const { updateUser } = useUsers();
  const [user, setUser] = useState<UserWithGroups | undefined>(undefined);
  const { allowWriteAccess } = usePermission();

  // Fetch latest version of the user
  useEffect(() => {
    const userId = parseNumber(id);
    if (userId) {
      updateUser(userId);
    }
  }, [id]);

  // find user from store and set it to be displayed
  useEffect(() => {
    const userId = parseNumber(id);
    if (userId) {
      const displayedUser = users.find(u => u.id === userId);
      setUser(displayedUser);
    }
  }, [id, users]);

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