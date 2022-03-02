import React from 'react';
import usePermission from '../../hooks/usePermission';

export const Users = () => {

  const { allowReadAccess } = usePermission();

  if (!allowReadAccess('users')) {
    return (
      <div>
        Access denied!
      </div>
    );
  }

  return (
    <div>
      Users
    </div>
  );
};