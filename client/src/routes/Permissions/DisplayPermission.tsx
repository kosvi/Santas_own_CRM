import React from 'react';
import { Functionality } from '../../types';
import { EditGroupForm } from './EditGroupForm';

export const DisplayPermission = ({ permission }: { permission: Functionality }) => {

  const read = permission.permission.read ? 'true' : 'false';
  const write = permission.permission.write ? 'true' : 'false';

  return (
    <div>
      <b>{permission.name}</b><br />
      read: <i>{read}</i> write: <i>{write}</i>
      <b>Edit!</b>
      <EditGroupForm permission={permission} />
    </div>
  );
};
